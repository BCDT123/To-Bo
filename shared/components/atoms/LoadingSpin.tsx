import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function LoadingSpin() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex justify-center items-center w-screen">
        <AiOutlineLoading3Quarters
          role="status"
          size={50}
          className="animate-spin text-thistle "
        />
      </div>
    </div>
  );
}
