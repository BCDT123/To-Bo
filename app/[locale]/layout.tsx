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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
        <NextIntlClientProvider locale={params.locale} messages={language}>
          <UserProvider>
            <IdleLogout />
            <SessionGate>
              <NavigationWrapper />
              {children}
            </SessionGate>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
