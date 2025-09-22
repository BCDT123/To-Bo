"use client";
import React from "react";
import { RiAddBoxFill } from "react-icons/ri";
import LoadingSpin from "@/shared/components/atoms/LoadingSpin";
import { ButtonRoundIcon } from "@/shared/components/atoms/Button";

/**
 * Props for Grid component.
 *
 * @property {string} title - The grid title.
 * @property {boolean} [loading] - Optional loading state for the grid.
 * @property {() => void} onAdd - Callback for adding a new item.
 * @property {React.ReactNode} children - The grid item elements.
 */
type GridProps = {
  title: string;
  loading?: boolean;
  onAdd: () => void;
  children: React.ReactNode;
};

/**
 * Exported Grid component.
 *
 * Purpose:
 * - Displays a grid of items with a title and an add button.
 *
 * Parameters:
 * @param {GridProps} props - Props containing title, loading state, add callback, and children.
 *
 * Returns:
 * @returns {JSX.Element} Section element with grid of items and add button.
 */
export default function Grid({
  title,
  loading = false,
  onAdd,
  children,
}: GridProps): JSX.Element {
  return (
    <section>
      {loading ? (
        <LoadingSpin />
      ) : (
        <div className="w-full">
          <div className="flex items-center mb-5 gap-2">
            <h2 className="text-lg font-medium">{title}</h2>
            <ButtonRoundIcon
              aria-label={`Add ${title}`}
              onClick={onAdd}
              type="button"
            >
              <RiAddBoxFill size={20} />
            </ButtonRoundIcon>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {children}
          </div>
        </div>
      )}
    </section>
  );
}
