import React from "react";
import MenuModalIcon from "@/shared/components/MenuModalIcon";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import Button from "@/shared/components/atoms/Button";
import Image from "next/image"; // Asegúrate de importar Image

export type DynamicCardProps<T> = {
  item: T;
  fields: {
    key: keyof T;
    label: string;
    render?: (value: any) => React.ReactNode;
  }[];
  menuOpen: string | null;
  setMenuOpen: (key: string | null) => void;
  onDelete: (item: T) => void;
  onEdit?: (item: T) => void;
  getKey: (item: T) => string;
  backgroundColor?: string;
  imageKey?: keyof T; // nombre de la propiedad de imagen
  colorKey?: keyof T; // nombre de la propiedad de color
  defaultImage?: string; // ruta de imagen por defecto
  iconImage?: React.ReactNode; // icono opcional en lugar de imagen
};

export default function DynamicCard<T>({
  item,
  fields,
  menuOpen,
  setMenuOpen,
  onDelete,
  onEdit,
  getKey,
  backgroundColor = "rgba(255, 255, 255, 0.5)",
  imageKey,
  colorKey,
  defaultImage = "/images/default-profile.png", // ajusta la ruta si es necesario
  iconImage,
}: DynamicCardProps<T>) {
  const key = getKey(item);

  // Obtén la imagen y el color si existen
  const imageSrc =
    imageKey && item[imageKey] ? String(item[imageKey]) : defaultImage;
  const color = colorKey && item[colorKey] ? String(item[colorKey]) : undefined;
  backgroundColor =
    colorKey && color && item[colorKey as keyof T]
      ? `${String(item[colorKey as keyof T]).replace("#", "#")}${
          String(item[colorKey as keyof T]).length === 7 ? "20" : ""
        }`
      : "rgba(224, 164, 175, 0.3)"; // thisle "rgba(190, 182, 217, 0.3)"; // apricot "rgba(242, 208, 169, 0.5)"; // almond"rgba(241, 227, 211, 0.5)";
  const handleDelete = () => {
    onDelete(item);
    setMenuOpen(null);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(item);
    setMenuOpen(null);
  };

  return (
    <div
      key={key}
      className="bg-apricot/20 relative flex flex-col p-4 shadow-sm"
      style={{ backgroundColor }}
    >
      <div className="absolute top-2 right-0">
        <MenuModalIcon
          open={menuOpen === key}
          onOpen={() => setMenuOpen(key)}
          onClose={() => setMenuOpen(null)}
          icon={<MdMoreVert size={22} />}
        >
          {onEdit && (
            <Button
              variant="tertiary"
              onClick={handleEdit}
              className="text-sm"
              align="left"
            >
              <MdEdit size={18} /> Edit
            </Button>
          )}
          <Button
            variant="tertiary"
            onClick={handleDelete}
            className="text-sm"
            align="left"
          >
            <MdDelete size={18} /> Delete
          </Button>
        </MenuModalIcon>
      </div>
      <div className="flex flex-row gap-2 pr-7">
        {/* Photo */}
        {imageKey && (
          <div
            className="min-w-15 min-h-15 flex items-center justify-center"
            style={color ? { backgroundColor: color } : undefined}
          >
            <Image
              src={imageSrc}
              alt={item["name"] ? String(item["name"]) : "profile"}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </div>
        )}
        {iconImage && (
          <div className="min-w-5 min-h-5 flex items-center justify-center">
            {iconImage}
          </div>
        )}
        {/* Details */}
        <div className="min-w-0 truncate flex-1 gap-2">
          {fields.map(
            ({ key, label, render }) =>
              item[key] && (
                <div key={String(key)} className="flex items-center gap-2">
                  <span>{render ? render(item[key]) : String(item[key])}</span>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
