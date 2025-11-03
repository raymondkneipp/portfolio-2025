import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { DEFAULT_CONFIG } from "./config";
import {
  applyStyling,
  normalizeCookies,
  normalizeScreenshotInput,
} from "./utils";
import { Project, ScreenshotItem } from "./types";
import { fileURLToPath } from "url";
import { config } from "@/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "../../../public/screenshots");
const DEFAULT_COOKIE_FILE = "cookies.json";

async function captureScreenshot(
  browser: any,
  cookies: any[],
  item: ScreenshotItem,
  config: Project["imagesConfig"],
): Promise<Buffer> {
  // Get values with defaults
  const colorScheme = config.colorScheme || DEFAULT_CONFIG.colorScheme;
  const viewport = config.viewport || DEFAULT_CONFIG.viewport;

  // Create a new context with the desired color scheme
  const context = await browser.newContext({
    colorScheme,
  });
  await context.addCookies(cookies);

  const page = await context.newPage();
  await page.setViewportSize(item.viewport || viewport);

  await page.goto(item.url, { waitUntil: "networkidle" });

  // Force color scheme after load
  if (colorScheme !== "no-preference") {
    await page.evaluate((scheme: any) => {
      // Set common localStorage keys for theme
      const themeKeys = [
        "vite-ui-theme",
        "theme",
        "colorMode",
        "color-mode",
        "ui-theme",
        "app-theme",
        "darkMode",
        "dark-mode",
      ];

      themeKeys.forEach((key) => {
        try {
          localStorage.setItem(key, scheme);
        } catch (e) {
          // Ignore storage errors
        }
      });

      // Override CSS variables
      const style = document.createElement("style");
      style.textContent = `
        :root {
          color-scheme: ${scheme} !important;
        }
        [data-theme], .dark, .light {
          color-scheme: ${scheme} !important;
        }
      `;
      document.head.appendChild(style);

      // Force a re-render by dispatching storage event
      window.dispatchEvent(new Event("storage"));
    }, colorScheme);

    // Reload to apply theme changes
    await page.reload({ waitUntil: "networkidle" });
  }

  if (item.scrollTo) {
    await page.evaluate(
      (scrollY: any) => window.scrollTo(0, scrollY),
      item.scrollTo,
    );
    await page.waitForTimeout(500);
  }

  // Execute steps if provided
  if (item.steps) {
    console.log(
      `    🎬 Executing ${item.steps.length} step${item.steps.length !== 1 ? "s" : ""}...`,
    );
    for (let i = 0; i < item.steps.length; i++) {
      const step = item.steps[i];
      try {
        if (step.type === "click") {
          let description = "";
          if (step.selector) {
            description = `click "${step.selector}"`;
            await page.click(step.selector);
          } else if (step.text) {
            description = `click text "${step.text}"`;
            await page.getByText(step.text).click();
          } else if (step.ariaLabel) {
            description = `click aria-label "${step.ariaLabel}"`;
            await page.getByLabel(step.ariaLabel).click();
          } else if (step.role) {
            const roleDesc = step.name
              ? `role "${step.role}" with name "${step.name}"`
              : `role "${step.role}"`;
            description = `click ${roleDesc}`;
            await page
              .getByRole(
                step.role as any,
                step.name ? { name: step.name } : undefined,
              )
              .click();
          }
          console.log(`    [${i + 1}/${item.steps.length}] ✅ ${description}`);
          if (step.waitAfter) {
            await page.waitForTimeout(step.waitAfter);
          }
        } else if (step.type === "wait") {
          console.log(
            `    [${i + 1}/${item.steps.length}] ✅ wait ${step.duration}ms`,
          );
          await page.waitForTimeout(step.duration);
        } else if (step.type === "type") {
          console.log(
            `    [${i + 1}/${item.steps.length}] ✅ type "${step.text}" into "${step.selector}"`,
          );
          await page.type(step.selector, step.text);
          if (step.waitAfter) {
            await page.waitForTimeout(step.waitAfter);
          }
        }
      } catch (error: any) {
        const stepDescription =
          step.type === "click"
            ? step.selector
              ? step.selector
              : step.text ||
                step.ariaLabel ||
                `${step.role}${step.name ? `: ${step.name}` : ""}`
            : step.type === "wait"
              ? `wait ${step.duration}ms`
              : `type into ${step.selector}`;
        console.log(
          `    [${i + 1}/${item.steps.length}] ❌ Failed: ${stepDescription}`,
        );
        console.log(`    ⚠️  Error: ${error.message || error}`);
        // Continue with next steps
      }
    }
  }

  let buffer = await page.screenshot({ fullPage: true });

  if (item.crop) {
    buffer = await sharp(buffer)
      .extract({
        left: item.crop.x,
        top: item.crop.y,
        width: item.crop.width,
        height: item.crop.height,
      })
      .toBuffer();
  }

  await page.close();
  await context.close();

  return buffer;
}

async function generateCoverImage(
  browser: any,
  cookies: any[],
  project: Project,
): Promise<Buffer> {
  if (!project.coverImage) {
    throw new Error(`Project ${project.name} has no coverImage configuration`);
  }

  console.log(`🎨 Creating cover image for ${project.name}`);

  const screenshots: Array<{ buffer: Buffer; width: number; height: number }> =
    [];

  for (const rawItem of project.coverImage.screenshots) {
    const viewport = project.imagesConfig.viewport || DEFAULT_CONFIG.viewport;
    const item = normalizeScreenshotInput(rawItem, viewport, "cover");
    console.log(`  📸 Capturing ${item.url}`);
    const buffer = await captureScreenshot(
      browser,
      cookies,
      item,
      project.imagesConfig,
    );
    const metadata = await sharp(buffer).metadata();
    screenshots.push({
      buffer,
      width: metadata.width!,
      height: metadata.height!,
    });
  }

  const columns = project.coverImage.columns || DEFAULT_CONFIG.columns;
  const padding = project.imagesConfig.padding || DEFAULT_CONFIG.padding;
  const columnAngle = project.coverImage.columnAngle;

  const viewport = project.imagesConfig.viewport || DEFAULT_CONFIG.viewport;
  const canvasWidth = viewport.width;
  const canvasHeight = viewport.height;

  // Calculate available width per column
  const availableWidth = (canvasWidth - padding * 2) / columns;

  const themeColor =
    project.imagesConfig.themeColor || DEFAULT_CONFIG.themeColor;

  // Group images into columns
  const columnImages: Array<Array<(typeof screenshots)[0]>> = Array(columns)
    .fill(0)
    .map(() => []);
  screenshots.forEach((img, idx) => {
    const col = idx % columns;
    columnImages[col].push(img);
  });

  // Calculate dimensions for all columns
  const columnDimensions: Array<Array<{ width: number; height: number }>> = [];
  const columnTotalHeights: number[] = [];

  for (let col = 0; col < columns; col++) {
    const images = columnImages[col];
    const dimensions: Array<{ width: number; height: number }> = [];
    let totalHeight = 0;

    for (const img of images) {
      const scale = availableWidth / img.width;
      const scaledWidth = Math.floor(img.width * scale);
      const scaledHeight = Math.floor(img.height * scale);
      dimensions.push({ width: scaledWidth, height: scaledHeight });
      totalHeight += scaledHeight + padding;
    }

    columnDimensions.push(dimensions);
    columnTotalHeights.push(totalHeight);
  }

  const maxColumnHeight = Math.max(...columnTotalHeights);
  let tempCanvasHeight = maxColumnHeight + padding * 2;

  const columnStartYs: number[] = columnTotalHeights.map((colHeight) => {
    return (
      padding + Math.floor((tempCanvasHeight - colHeight - padding * 2) / 2)
    );
  });

  const compositeItems: Array<{ input: Buffer; left: number; top: number }> =
    [];
  let maxX = -Infinity;

  for (let col = 0; col < columns; col++) {
    const images = columnImages[col];
    const dimensions = columnDimensions[col];
    let currentY = columnStartYs[col];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const { width: scaledWidth, height: scaledHeight } = dimensions[i];

      const resized = await sharp(img.buffer)
        .resize(scaledWidth, scaledHeight)
        .png()
        .toBuffer();

      const baseLeftPosition = padding + col * (availableWidth + padding);
      maxX = Math.max(maxX, baseLeftPosition + scaledWidth);

      compositeItems.push({
        input: resized,
        left: baseLeftPosition,
        top: currentY,
      });

      currentY += scaledHeight + padding;
    }
  }

  const contentWidth = maxX + padding;
  const rotationPadding = 200;

  let tempCanvasWidth = contentWidth + rotationPadding * 2;
  tempCanvasHeight += rotationPadding * 2;

  const horizontalOffset = Math.floor((tempCanvasWidth - contentWidth) / 2);
  const verticalOffset = rotationPadding;

  const offsetCompositeItems = compositeItems.map((item) => ({
    input: item.input,
    left: item.left + horizontalOffset,
    top: item.top + verticalOffset,
  }));

  const tempCanvas = sharp({
    create: {
      width: tempCanvasWidth,
      height: tempCanvasHeight,
      channels: 4,
      background: themeColor,
    },
  });

  let tempCollageBuffer = await tempCanvas
    .composite(offsetCompositeItems)
    .png()
    .toBuffer();

  if (columnAngle !== 0) {
    const angleRad = (columnAngle * Math.PI) / 180;
    const cosAngle = Math.abs(Math.cos(angleRad));
    const sinAngle = Math.abs(Math.sin(angleRad));

    const rotatedWidth = Math.ceil(
      tempCanvasWidth * cosAngle + tempCanvasHeight * sinAngle,
    );
    const rotatedHeight = Math.ceil(
      tempCanvasHeight * cosAngle + tempCanvasWidth * sinAngle,
    );

    const rotatedSvg = Buffer.from(`
      <svg width="${rotatedWidth}" height="${rotatedHeight}">
        <g transform="translate(${rotatedWidth / 2}, ${rotatedHeight / 2}) rotate(${columnAngle}) translate(${-tempCanvasWidth / 2}, ${-tempCanvasHeight / 2})">
          <image href="data:image/png;base64,${tempCollageBuffer.toString("base64")}" width="${tempCanvasWidth}" height="${tempCanvasHeight}"/>
        </g>
      </svg>
    `);

    tempCollageBuffer = await sharp(rotatedSvg).png().toBuffer();

    tempCanvasWidth = rotatedWidth;
    tempCanvasHeight = rotatedHeight;
  }

  const centerY =
    Math.floor(tempCanvasHeight / 2) - Math.floor(canvasHeight / 2);
  const centerX = Math.floor(tempCanvasWidth / 2) - Math.floor(canvasWidth / 2);

  const collageBuffer = await sharp(tempCollageBuffer)
    .extract({
      left: Math.max(0, centerX),
      top: Math.max(0, centerY),
      width: canvasWidth,
      height: canvasHeight,
    })
    .png()
    .toBuffer();

  return await applyStyling(
    collageBuffer,
    themeColor,
    project.imagesConfig.borderRadius || DEFAULT_CONFIG.borderRadius,
    0,
    project.imagesConfig.shadow || DEFAULT_CONFIG.shadow,
  );
}

async function loadCookiesForProject(project: Project): Promise<any[]> {
  const cookieFile = project.cookieFile || DEFAULT_COOKIE_FILE;
  const cookiePath = path.resolve(__dirname, "../cookies/" + cookieFile);

  if (!fs.existsSync(cookiePath)) {
    console.log(
      `  ⚠️  No cookie file found at cookies/${cookieFile}, proceeding without cookies`,
    );
    return [];
  }

  const cookiesRaw = JSON.parse(fs.readFileSync(cookiePath, "utf-8"));
  return normalizeCookies(cookiesRaw);
}

async function generateProjectImages(
  project: Project,
  browser: any,
  cookies: any[],
) {
  console.log(`\n🎯 Generating images for ${project.name}`);

  // Create project-specific directory with normalized name
  const normalizedName = project.name.toLowerCase().replace(/\s+/g, "-");
  const projectDir = path.join(OUTPUT_DIR, normalizedName);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // Generate individual screenshots
  console.log(`📸 Generating ${project.screenshots.length} screenshots...`);
  for (let i = 0; i < project.screenshots.length; i++) {
    const viewport = project.imagesConfig.viewport || DEFAULT_CONFIG.viewport;
    const item = normalizeScreenshotInput(
      project.screenshots[i],
      viewport,
      "screenshot",
    );
    const filename = `${i + 1}.webp`;
    const outputPath = path.join(projectDir, filename);

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(
        `  [${i + 1}/${project.screenshots.length}] ⏭️  Skipping ${filename} (already exists)`,
      );
      continue;
    }

    console.log(
      `  [${i + 1}/${project.screenshots.length}] Capturing ${item.url}`,
    );

    const buffer = await captureScreenshot(
      browser,
      cookies,
      item,
      project.imagesConfig,
    );

    const styledBuffer = await applyStyling(
      buffer,
      project.imagesConfig.themeColor || DEFAULT_CONFIG.themeColor,
      project.imagesConfig.borderRadius || DEFAULT_CONFIG.borderRadius,
      project.imagesConfig.padding || DEFAULT_CONFIG.padding,
      project.imagesConfig.shadow || DEFAULT_CONFIG.shadow,
    );

    await sharp(styledBuffer).webp({ quality: 90 }).toFile(outputPath);
    console.log(`    ✅ Saved ${filename}`);
  }

  // Generate cover image
  if (project.coverImage) {
    const coverFilename = `cover.webp`;
    const coverOutputPath = path.join(projectDir, coverFilename);

    // Skip if file already exists
    if (fs.existsSync(coverOutputPath)) {
      console.log(`  ⏭️  Skipping ${coverFilename} (already exists)`);
    } else {
      const coverBuffer = await generateCoverImage(browser, cookies, project);
      await sharp(coverBuffer).webp({ quality: 90 }).toFile(coverOutputPath);
      console.log(`✅ Saved ${coverFilename}`);
    }
  }
}

async function generateAllImages() {
  const startTime = Date.now();

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (let i = 0; i < config.projects.length; i++) {
    const project = config.projects[i];
    console.log(
      `\n[${i + 1}/${config.projects.length}] Processing ${project.name}`,
    );

    // Load project-specific cookies
    const cookies = await loadCookiesForProject(project);
    await generateProjectImages(project, browser, cookies);
  }

  await browser.close();

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  console.log(`\n🎉 All images generated in ${duration}s!`);
}

generateAllImages().catch(console.error);
