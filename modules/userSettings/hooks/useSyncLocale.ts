import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation';

function isLocaleObject(value: unknown): value is { language?: string } {
  return typeof value === "object" && value !== null && "language" in value;
}

/**
 * Synchronizes the provided locale with a cookie and sets it as the user's language preference.
 *
 * @param {Object|string|null|undefined} locale - The locale information to synchronize. It can be:
 *  - An object with an optional 'language' property.
 *  - A string representing the locale directly.
 *  - null or undefined, which will fall back to the default locale ('en').
 * @return {void} No return value.
 */
export function useSyncLocale(locale: { language?: string } | string | null | undefined) {
  const router = useRouter();

  useEffect(() => {
    let localeValue = 'en';

    if (typeof locale === 'string') {
      localeValue = locale;
    } else if (isLocaleObject(locale)) {
      localeValue = locale.language || 'en';
    }

    setCookie("locale", localeValue, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    router.refresh();

    if (process.env.NODE_ENV === "development") {
      console.log("User context set language cookie:", localeValue);
    }
  }, [locale, router]);
}