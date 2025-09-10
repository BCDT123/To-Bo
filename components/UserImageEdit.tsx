import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import profileImage from "@/public/images/default-profile.png";
import Image from "next/image";

type UserImageEditProps = {
  photoUrl: string;
  name: string;
  onImageChange: (file: File) => void;
};

export default function UserImageEdit({
  photoUrl,
  name,
  onImageChange,
}: UserImageEditProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-[120px] h-[120px]">
        <Image
          src={photoUrl || profileImage}
          alt={name}
          width={120}
          height={120}
          className="rounded-full object-cover w-full h-full"
        />
        <span
          className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-2 shadow cursor-pointer"
          onClick={handleCameraClick}
        >
          <FaCamera />
        </span>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
