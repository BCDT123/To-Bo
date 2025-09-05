"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "./NavigationBar";

export default function NavigationWrapper() {
  const pathname = usePathname();

  const hiddenSegments = ["login", "register", "onboarding", "error"];

  const shouldHideNav = hiddenSegments.some((segment) =>
    pathname.endsWith(`/${segment}`)
  );

  if (shouldHideNav) return null;

  return <NavigationBar pathname={pathname} />;
}
