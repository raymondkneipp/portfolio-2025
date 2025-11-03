import { createFileRoute } from "@tanstack/react-router";
import { renderToBuffer } from "@react-pdf/renderer";
import { MyResume } from "@/resume";
import { env } from "@/env/server";
import { formatPhoneNumber } from "@/lib/format";
import { config } from "@/config";

export const Route = createFileRoute("/resume")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const phoneRaw = env.CONTACT_PHONE;
          // Remove +1 prefix for formatting
          const phoneForFormatting = phoneRaw.replace(/^\+1/, "");
          const phone = formatPhoneNumber(phoneForFormatting);
          const email = env.CONTACT_EMAIL;

          // Generate PDF server-side
          const pdfBuffer = await renderToBuffer(
            <MyResume email={email} phone={phone} phoneRaw={phoneRaw} />,
          );

          // Return PDF as response
          const filename = `${config.firstName}_${config.lastName}_Resume.pdf`;

          return new Response(pdfBuffer as unknown as BodyInit, {
            status: 200,
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `inline; filename="${filename}"`,
              "Content-Length": pdfBuffer.length.toString(),
            },
          });
        } catch (error) {
          console.error("Error generating resume PDF:", error);
          return new Response("Failed to generate resume", {
            status: 500,
            headers: {
              "Content-Type": "text/plain",
            },
          });
        }
      },
    },
  },
});
