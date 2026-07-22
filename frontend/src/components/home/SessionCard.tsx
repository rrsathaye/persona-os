import { MessageCircle } from "lucide-react";

type SessionCardProps = {
  title: string;
  lastEdited: string;
};

export default function SessionCard({
  title,
  lastEdited,
}: SessionCardProps) {
  return (
    <button
      className="group
        w-full rounded-2xl
        border border-neutral-800
        bg-neutral-900
        p-5
        text-left
      transition-all duration-300 ease-out
hover:-translate-y-1
hover:scale-[1.01]
hover:border-neutral-600
hover:bg-neutral-800
hover:shadow-2xl    
      "
    >
      <div className="flex items-start gap-4">
        <div
  className="
    rounded-xl
    bg-neutral-800
    p-3
    transition-transform
    duration-300
    group-hover:rotate-6
    group-hover:scale-110
  "
>
          <MessageCircle className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>

          <p className="mt-1 text-sm text-neutral-400">
            {lastEdited}
          </p>
        </div>
      </div>
    </button>
  );
}