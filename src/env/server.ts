import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONTACT_EMAIL: z.email(),
    CONTACT_PHONE: z.e164(),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
