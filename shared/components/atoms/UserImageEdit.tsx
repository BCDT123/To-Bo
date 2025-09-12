import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import profileImage from "@/public/images/default-profile.png";
import Image from "next/image";

/**
 * Props for UserImageEdit
 * @property {string} photoUrl - The URL of the user's profile photo.
 * @property {string} name - The user's name, used for the alt attribute.
 * @property {(file: File) => void} onImageChange - Callback when a new image is selected.
 */
type UserImageEditProps = {
  photoUrl: string;
  name: string;
  onImageChange: (file: File) => void;
};

/**
 * UserImageEdit component
 *
 * Purpose:
 * - Renders the user's profile image with an option to upload a new photo.
 * - Handles image selection and preview.
 *
 * Parameters:
 * @param {UserImageEditProps} props - Contains photoUrl, name, and onImageChange callback.
 *
 * Returns:
 * @returns {JSX.Element} The profile image edit UI.
 */
export default function UserImageEdit({
  photoUrl,
  name,
  onImageChange,
}: UserImageEditProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles the camera icon click to trigger file input
   */
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handles file input change event
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
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
