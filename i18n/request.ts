import { getRequestConfig } from "next-intl/server";
import { supportedLocales, defaultLocale } from "@/config/locales";
import { loadLanguage } from "@/lib/loadLanguages";

// Verifica que el locale recibido esté soportado
// Carga el archivo de traducciones correspondiente (en.json, es.json, etc.)
// Aplica un fallback si el idioma no está disponible
// ¿Cuándo usarlo?
// Siempre. Es el corazón de tu sistema de traducción.
// Incluso si no usas middleware, esto asegura que tu app no se rompa por un idioma no soportado

export default getRequestConfig(async ({ locale }) => {
  const shortLocale = locale?.split("-")[0] ?? "";
  const resolvedLocale = supportedLocales.includes(shortLocale)
    ? shortLocale
    : defaultLocale;

  // logs condicionales para desarrollo:
  if (process.env.NODE_ENV === "development") {
    console.log("i18n Detected languages:", supportedLocales);
    console.log("i18n Resolved locale:", resolvedLocale);
  }

  // Carga todos los módulos de ese idioma
  const language = await loadLanguage(resolvedLocale);

  return {
    locale: resolvedLocale,
    language,
  };
});
