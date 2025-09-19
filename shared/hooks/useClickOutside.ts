import { useEffect, RefObject } from "react";

/**
 * Custom hook to detect clicks outside a referenced element.
 *
 * @param {RefObject<T>} ref - The ref of the element to detect outside clicks for.
 * @param {() => void} handler - The function to call when a click outside is detected.
 * @param {string[]} [ignoreSelectors] - Optional array of selectors to ignore (e.g., links).
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  ignoreSelectors: string[] = []
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isIgnored = ignoreSelectors.some((selector) =>
        target.closest(selector)
      );
      if (ref.current && !ref.current.contains(target) && !isIgnored) {
        setTimeout(handler, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler, ignoreSelectors]);
}
