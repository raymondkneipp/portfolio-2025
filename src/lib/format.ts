/**
 * Formats a phone number in E.164 format to a readable US format.
 * Example: +15551234567 -> (555) 123-4567
 * Example: +155512345678 -> (555) 123-4567 ext. 8
 */
export function formatPhoneNumber(phone: string): string {
  // Remove the + and country code (assuming US +1)
  let cleaned = phone.replace(/^\+1/, "");

  // Handle extensions
  const extensionMatch = cleaned.match(/^(\d{10})(\d+)$/);
  if (extensionMatch) {
    const [, mainNumber, ext] = extensionMatch;
    const formatted = formatUSPhone(mainNumber);
    return `${formatted} ext. ${ext}`;
  }

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return formatUSPhone(cleaned);
  }

  // If it doesn't match expected format, return as-is
  return phone;
}

function formatUSPhone(phone: string): string {
  // Format as (XXX) XXX-XXXX
  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
}

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function linkFormatter(link: string) {
  return link
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "");
}
