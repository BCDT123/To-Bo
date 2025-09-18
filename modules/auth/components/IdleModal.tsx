import React from "react";
import Button from "@/shared/components/atoms/Button";

/**
 * IdleModal component
 *
 * Purpose:
 * - Displays a modal warning the user that their session will be closed due to inactivity.
 * - Allows the user to stay active or log out immediately.
 *
 * Advantages:
 * - Improves security by notifying users before automatic logout.
 * - Provides a clear and accessible way to prevent unwanted session termination.
 *
 * @param {object} props - The component props.
 * @param {number} props.countdown - Seconds remaining before auto logout.
 * @param {() => void} props.onStayActive - Function to call when user chooses to stay active.
 * @param {() => void} props.onLogout - Function to call when user chooses to log out.
 * @param {(key: string) => string} props.tAuth - Translation function for auth messages.
 * @param {(key: string) => string} props.tCommon - Translation function for common messages.
 * @returns {JSX.Element} The modal UI.
 */
export default function IdleModal({
  countdown,
  onStayActive,
  onLogout,
  tAuth,
  tCommon,
}: {
  countdown: number;
  onStayActive: () => void;
  onLogout: () => void;
  tAuth: (key: string) => string;
  tCommon: (key: string) => string;
}) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4">
          {tAuth("msgSessionWillBeClose")} <br />
          <span className="text-sm text-gray-500">
            {tAuth("autoLogoutIn")} {countdown} {tCommon("seconds")}
          </span>
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="primary" onClick={onStayActive}>
            {tCommon("close")}
          </Button>
          <Button variant="primary" onClick={onLogout}>
            {tAuth("logout")}
          </Button>
        </div>
      </div>
    </div>
  );
}
