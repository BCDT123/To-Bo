import { namespaces } from "@/config/locales";

/**
 * Loads translation messages for a given locale.
 *
 * Purpose:
 * - Dynamically imports all translation JSON files for the specified locale and namespaces.
 * - Combines all messages into a single object for use in internationalization.
 *
 * @param locale - The locale code (e.g., "en", "es") to load translations for.
 * @returns An object containing all translation messages for the locale.
 */
export async function loadLanguage(locale: string) {
  const messages: Record<string, any> = {};
  for (const ns of namespaces) {
    const module = await import(`@/i18n/languages/${locale}/${ns}.json`);
    Object.assign(messages, module.default);
  }

  return messages;
}
