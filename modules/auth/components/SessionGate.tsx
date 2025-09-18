"use client";
import React from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import type { User } from "firebase/auth";
import LoadingSpin from "@/shared/components/atoms/LoadingSpin";
/**
 * List of public routes that do not require authentication.
 * If the current path ends with any of these, the user can access without being logged in.
 */
const publicRoutes = ["/login", "/register", "/onboarding", "/error"];

/**
 * SessionGate component
 *
 * Purpose:
 * - Protects private routes by checking user authentication state.
 * - Redirects unauthenticated users to the login page if they try to access protected routes.
 * - Shows a loading spinner while the authentication state is being determined.
 * - Allows access to public routes even if the user is not logged in.
 *
 * Advantages:
 * - Centralizes session and route protection logic.
 * - Prevents unauthorized access to private pages.
 * - Improves user experience by showing a loader during authentication checks.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to render if access is allowed.
 * @returns {React.ReactNode | null} The protected content, loader, or null if redirecting.
 */
export default function SessionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  /**
   * Checks if the current route is public.
   * If the path ends with any value in publicRoutes, it is considered public.
   */
  const isPublicRoute = publicRoutes.some((route) => pathname.endsWith(route));

  /**
   * Subscribes to Firebase Auth state changes.
   * Updates the user state when authentication changes.
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  /**
   * Redirects to /login if the user is not authenticated and the route is not public.
   */
  useEffect(() => {
    if (user === null && !isPublicRoute) {
      router.replace("/login");
    }
  }, [user, isPublicRoute, router]);

  /**
   * Redirects to the home page if the user is authenticated and tries to access the login page.
   */
  useEffect(() => {
    if (user && pathname.endsWith("/login")) {
      router.replace("/");
    }
  }, [user, pathname, router]);

  /**
   * Shows a loading spinner while the authentication state is being determined.
   */
  if (user === undefined) {
    return <LoadingSpin />;
  }

  /**
   * If the route is public, render the children even if the user is not logged in.
   */
  if (isPublicRoute) {
    return <>{children}</>;
  }

  /**
   * If the user is authenticated, render the protected content.
   */
  if (user) {
    return <>{children}</>;
  }

  /**
   * If the user is not authenticated and the route is not public, the redirection already happened in useEffect.
   */
  return null;
}
