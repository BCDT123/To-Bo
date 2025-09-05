import Button from "@/components/Button";

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
          <Button onClick={onStayActive}>{tCommon("close")}</Button>
          <Button onClick={onLogout}>{tAuth("logout")}</Button>
        </div>
      </div>
    </div>
  );
}
