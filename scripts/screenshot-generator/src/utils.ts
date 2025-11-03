import sharp from "sharp";
import { ShadowConfig, ScreenshotItem, ScreenshotInput } from './types';
import { DEFAULT_CONFIG } from './config';

export function normalizeScreenshotInput(
  input: ScreenshotInput,
  defaultViewport: { width: number; height: number },
  mode: 'screenshot' | 'cover' = 'screenshot'
): ScreenshotItem {
  // If input is a string, convert to ScreenshotItem
  if (typeof input === 'string') {
    const item: ScreenshotItem = { url: input };
    
    // Add default crop for regular screenshots (not for cover images)
    if (mode === 'screenshot') {
      item.crop = {
        x: 0,
        y: 0,
        width: defaultViewport.width,
        height: defaultViewport.height,
      };
    }
    
    return item;
  }
  
  // If input is already an object
  // Add default crop for regular screenshots only (and only if crop not already specified)
  if (mode === 'screenshot' && !input.crop) {
    return {
      ...input,
      crop: {
        x: 0,
        y: 0,
        width: defaultViewport.width,
        height: defaultViewport.height,
      },
    };
  }
  
  // Return as-is (cover images or already has crop)
  return input;
}

export function normalizeCookies(rawCookies: any[]) {
  return rawCookies.map((c) => ({
    name: c.name,
    value: c.value,
    domain: c.domain,
    path: c.path || "/",
    expires: c.expirationDate ? Math.floor(c.expirationDate) : -1,
    httpOnly: !!c.httpOnly,
    secure: !!c.secure,
    sameSite:
      c.sameSite === "no_restriction"
        ? "None"
        : c.sameSite === "lax"
          ? "Lax"
          : c.sameSite === "strict"
            ? "Strict"
            : "Lax",
  }));
}

export async function applyStyling(
  buffer: Buffer,
  themeColor: string,
  borderRadius: number,
  padding: number,
  shadow?: ShadowConfig,
): Promise<Buffer> {
  const metadata = await sharp(buffer).metadata();
  const imageWidth = metadata.width!;
  const imageHeight = metadata.height!;

  // Final output size is always 1600×900
  const OUTPUT_WIDTH = 1600;
  const OUTPUT_HEIGHT = 900;
  const contentWidth = OUTPUT_WIDTH - 2 * padding;
  const contentHeight = OUTPUT_HEIGHT - 2 * padding;

  // Scale image to fit within content area (maintaining aspect ratio)
  const scaleX = contentWidth / imageWidth;
  const scaleY = contentHeight / imageHeight;
  const scale = Math.min(scaleX, scaleY, 1); // Don't upscale

  const scaledWidth = Math.floor(imageWidth * scale);
  const scaledHeight = Math.floor(imageHeight * scale);

  // Scale the image
  let scaledBuffer = await sharp(buffer)
    .resize(scaledWidth, scaledHeight)
    .png()
    .toBuffer();

  // Apply border radius to scaled image
  if (borderRadius > 0) {
    const maskSvg = Buffer.from(`
      <svg width="${scaledWidth}" height="${scaledHeight}">
        <rect width="${scaledWidth}" height="${scaledHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="white"/>
      </svg>
    `);

    scaledBuffer = await sharp(scaledBuffer).composite([
      {
        input: maskSvg,
        blend: "dest-in",
      },
    ]).png().toBuffer();
  }

  const backgroundColor = themeColor || DEFAULT_CONFIG.themeColor;

  // Calculate centered position
  const offsetX = Math.floor((OUTPUT_WIDTH - scaledWidth) / 2);
  const offsetY = Math.floor((OUTPUT_HEIGHT - scaledHeight) / 2);

  // Create output canvas
  const canvas = sharp({
    create: {
      width: OUTPUT_WIDTH,
      height: OUTPUT_HEIGHT,
      channels: 4,
      background: backgroundColor,
    },
  });

  const compositeItems: Array<{ input: Buffer; left: number; top: number }> = [];
  
  if (shadow) {
    const shadowOffsetX = shadow.offsetX ?? DEFAULT_CONFIG.shadow.offsetX;
    const shadowOffsetY = shadow.offsetY ?? DEFAULT_CONFIG.shadow.offsetY;
    const shadowBlur = shadow.blur ?? DEFAULT_CONFIG.shadow.blur;
    const shadowColor = shadow.color ?? DEFAULT_CONFIG.shadow.color;
    const shadowOpacity = shadow.opacity ?? DEFAULT_CONFIG.shadow.opacity;

    const shadowExtent = Math.ceil(shadowBlur * 2) + Math.max(Math.abs(shadowOffsetX), Math.abs(shadowOffsetY));
    const svgWidth = OUTPUT_WIDTH + shadowExtent * 2;
    const svgHeight = OUTPUT_HEIGHT + shadowExtent * 2;
    
    const shadowSvg = Buffer.from(`
      <svg width="${svgWidth}" height="${svgHeight}">
        <rect 
          width="${scaledWidth}" 
          height="${scaledHeight}" 
          rx="${borderRadius || 0}" 
          ry="${borderRadius || 0}"
          x="${offsetX + shadowExtent + shadowOffsetX}"
          y="${offsetY + shadowExtent + shadowOffsetY}"
          fill="${shadowColor}"
          opacity="${shadowOpacity}"/>
      </svg>
    `);

    const blurredShadow = await sharp(shadowSvg)
      .blur(shadowBlur)
      .extract({
        left: shadowExtent,
        top: shadowExtent,
        width: OUTPUT_WIDTH,
        height: OUTPUT_HEIGHT,
      })
      .toBuffer();

    compositeItems.push({
      input: blurredShadow,
      left: 0,
      top: 0,
    });
  }

  compositeItems.push({
    input: scaledBuffer,
    left: offsetX,
    top: offsetY,
  });

  return await canvas.composite(compositeItems).png().toBuffer();
}

