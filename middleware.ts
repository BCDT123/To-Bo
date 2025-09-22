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
export function middleware(request: NextRequest): NextResponse {
  // Check for a locale cookie first.
  let locale = request.cookies.get("locale")?.value;

  // If no locale cookie is found, detect the user's language.
  if (!locale) {
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
    locale = match(shortLanguages, supportedLocales, defaultLocale);
  }

  // Conditional logs for development
  if (process.env.NODE_ENV === "development") {
    console.log("Middleware Resolved locale:", locale);
  }

  const response = NextResponse.next();
  response.cookies.set("locale", locale, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}

/**
 * Configuration for the middleware matcher
 *
 * matcher: Defines which routes the middleware should run on.
 */
export const config = {
  matcher: ["/((?!_next|favicon|site.webmanifest|api).*)"],
};
