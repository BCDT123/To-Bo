"use client";
import React from "react";
import { usePathname } from "next/navigation";
import NavigationBar from "./NavigationBar";

/**
 * NavigationWrapper component
 *
 * Purpose:
 * - Determines if the navigation bar should be displayed based on the current route.
 * - Hides the navigation bar for specific segments (login, register, onboarding, error).
 *
 * Parameters:
 * - None
 *
 * Returns:
 * - {JSX.Element | null} The NavigationBar component if visible, otherwise null.
 */
export default function NavigationWrapper() {
  const pathname = usePathname();

  // Segments for which the navigation bar should be hidden
  const hiddenSegments = ["login", "register", "onboarding", "error"];

  // Checks if the current pathname ends with any hidden segment
  const shouldHideNav = hiddenSegments.some((segment) =>
    pathname.endsWith(`/${segment}`)
  );

  // If the navigation bar should be hidden, return null
  if (shouldHideNav) return null;

  // Otherwise, render the NavigationBar component
  return <NavigationBar pathname={pathname} />;
}
