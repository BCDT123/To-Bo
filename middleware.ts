// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import { supportedLocales, defaultLocale } from "@/config/locales";

/**
 * Middleware function
 *
 * Purpose:
 * - Detects the user's browser language before the page loads.
 * - Redirects the user to the correct locale route (/es, /en, etc.).
 * - Prevents users from landing on / and seeing a 404.
 *
 * Parameters:
 * @param {NextRequest} request - The incoming request object from Next.js.
 *
 * Returns:
 * @returns {NextResponse} The response object, either allowing the request to proceed or redirecting to the correct locale.
 */
export function middleware(request: NextRequest) {
  // Get the Accept-Language header from the request
  const acceptLanguage = request.headers.get("accept-language") || "";
  // Parse the languages from the header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim()) // Removes ";q=..." and spaces
    .filter(Boolean); // Removes empty strings

  // Extract short language codes (e.g., "en" from "en-US")
  const shortLanguages = languages.map((lang) => lang.split("-")[0]);
  // Match the user's language to a supported locale
  const locale = match(shortLanguages, supportedLocales, defaultLocale);

  // Conditional logs for development
  if (process.env.NODE_ENV === "development") {
    console.log("Middleware Detected languages:", languages);
    console.log("Middleware Resolved locale:", locale);
  }

  const pathname = request.nextUrl.pathname;
  // If the pathname already includes a locale, do not redirect
  if (supportedLocales.some((loc) => pathname.startsWith(`/${loc}`))) {
    return NextResponse.next();
  }

  // Redirect to /[locale] if not present
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

/**
 * Configuration for the middleware matcher
 *
 * matcher: Defines which routes the middleware should run on.
 */
export const config = {
  matcher: ["/((?!_next|favicon|site.webmanifest|api).*)"],
};
