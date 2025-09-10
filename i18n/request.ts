import { getRequestConfig } from "next-intl/server";
import { supportedLocales, defaultLocale } from "@/config/locales";
import { loadLanguage } from "@/lib/loadLanguages";

/**
 * Checks if the received locale is supported.
 * Loads the corresponding translation file (en.json, es.json, etc.).
 * Applies a fallback if the language is not available.
 *
 * When to use it?
 * Always. This is the heart of your translation system.
 * Even if you don't use middleware, this ensures your app won't break due to an unsupported language.
 */

export default getRequestConfig(async ({ locale }) => {
  // Extracts the short locale code (e.g., "en" from "en-US")
  const shortLocale = locale?.split("-")[0] ?? "";

  // Resolves the locale: uses the requested one if supported, otherwise falls back to default
  const resolvedLocale = supportedLocales.includes(shortLocale)
    ? shortLocale
    : defaultLocale;

  // Conditional logs for development
  if (process.env.NODE_ENV === "development") {
    console.log("i18n Detected languages:", supportedLocales);
    console.log("i18n Resolved locale:", resolvedLocale);
  }

  // Loads all translation modules for the resolved language
  const language = await loadLanguage(resolvedLocale);

  // Returns the locale and loaded language messages for use in the app
  return {
    locale: resolvedLocale,
    language,
  };
});
