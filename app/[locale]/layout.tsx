import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { loadLanguage } from "@/lib/loadLanguages";
import { UserProvider } from "@/features/users/userContext";
import IdleLogout from "@/features/login/IdleLogout";
import NavigationWrapper from "@/components/nav/NavigationWrapper";
import SessionGate from "@/features/login/SessionGate";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

/**
 * Metadata for the application.
 *
 * Purpose:
 * - Defines SEO and Open Graph metadata for the app.
 * - Improves discoverability and sharing on social platforms.
 *
 * Advantages:
 * - Centralizes metadata configuration.
 * - Ensures consistent branding and description across pages.
 */
export const metadata: Metadata = {
  title: "Today Baby Tracker",
  description: "Track your baby's daily activities with ease",
  openGraph: {
    title: "Today Baby Tracker",
    description: "Track your baby's daily activities with ease",
    url: "https://misitio.com",
    images: [
      {
        url: "https://misitio.com/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
};

/**
 * LocaleLayout component
 *
 * Purpose:
 * - Provides the main layout for all locale-based routes.
 * - Loads the correct language messages for internationalization.
 * - Wraps the app with user context, session protection, navigation, and idle logout logic.
 *
 * Advantages:
 * - Centralizes layout and context providers for all pages.
 * - Ensures consistent language and session management across the app.
 * - Improves maintainability and scalability for i18n and authentication.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to render inside the layout.
 * @param {object} props.params - The route parameters, including locale.
 * @param {string} props.params.locale - The current locale code.
 * @returns {JSX.Element} The complete HTML layout for the locale route.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Loads translation messages for the current locale
  const language = await loadLanguage(params.locale);

  return (
    <html lang={params.locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta name="theme-color" content="#ffffff" /> */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} antialiased`}
      >
        {/* Provides translation messages and locale to all components */}
        <NextIntlClientProvider locale={params.locale} messages={language}>
          {/* Provides user authentication context to the app */}
          <UserProvider>
            {/* Handles automatic logout on user inactivity */}
            <IdleLogout />
            {/* Protects routes and manages session-based access */}
            <SessionGate>
              {/* Renders the navigation bar */}
              <NavigationWrapper />
              {/* Renders the page content */}
              {children}
            </SessionGate>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
