import { createServerFn } from "@tanstack/react-start";
import { env } from "@/env/server";
import { formatPhoneNumber } from "@/lib/format";

export const getContactInfo = createServerFn({
  method: "GET",
}).handler(async () => {
  const phoneRaw = env.CONTACT_PHONE;
  const phoneForFormatting = phoneRaw.replace(/^\+1/, "");

  return {
    email: env.CONTACT_EMAIL,
    phone: formatPhoneNumber(phoneForFormatting),
    phoneRaw: phoneRaw,
  };
});

