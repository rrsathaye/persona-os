import { PenSquare } from "lucide-react";

type NewWritingCardProps = {
  onClick: () => void;
};

export default function NewWritingCard({
  onClick,
}: NewWritingCardProps) {
  return (
    <button   onClick={onClick}
      className="
        group
        mt-8
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        border-2
        border-dashed
        border-neutral-700
        bg-transparent
        p-6
        text-neutral-300
        transition-all
        duration-300
        ease-out
        hover:scale-[1.02]
        hover:border-white
        hover:bg-neutral-900
        hover:shadow-2xl
      "
    >
      <PenSquare
        className="
          h-5
          w-5
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />

      <span className="text-lg font-medium">
        New Writing
      </span>
    </button>
  );
}