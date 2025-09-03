
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import {supportedLocales,defaultLocale} from "@/config/locales"

// Detecta el idioma del navegador antes de que se cargue la página
// Redirige al usuario a la ruta correcta (/es, /en, etc.)
// Evita que alguien llegue a / y vea un 404

export function middleware(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const languages = acceptLanguage
  .split(',')
  .map(lang => lang.split(';')[0].trim()) // Elimina el ";q=..." y espacios
  .filter(Boolean); // Elimina strings vacíos


const shortLanguages = languages.map(lang => lang.split('-')[0]);
const locale = match(shortLanguages, supportedLocales, defaultLocale);

// logs condicionales para desarrollo:
if (process.env.NODE_ENV === 'development') {
  console.log('Middleware Detected languages:', languages);
  console.log('Middleware Resolved locale:', locale);
}
  const pathname = request.nextUrl.pathname;
  // Si ya incluye el locale, no redirigir
  if (supportedLocales.some((loc) => pathname.startsWith(`/${loc}`))) {
    return NextResponse.next();
  }

  // Redirigir a /[locale]
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!_next|favicon|site.webmanifest|api).*)'],
};
