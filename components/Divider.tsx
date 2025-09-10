type DividerProps = {
  text: string;
};

export default function Divider({ text }: DividerProps) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-300" />
      <span className="mx-4 text-gray-500 text-sm">{text}</span>
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  );
}
export function DividerLine() {
  return (
    <div className="flex items-center">
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  );
}
