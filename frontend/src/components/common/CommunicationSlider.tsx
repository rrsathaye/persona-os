type CommunicationSliderProps = {
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
};

export default function CommunicationSlider({
  leftLabel,
  rightLabel,
  value,
  onChange,
}: CommunicationSliderProps) {
  const leftPercentage = 100 - value;
  const rightPercentage = value;

  return (
    <div className="space-y-2">

      <div className="flex justify-between text-sm font-medium">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>

      <div className="flex items-center gap-4">

        <span className="w-12 text-sm text-zinc-400">
          {leftPercentage}%
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-white"
        />

        <span className="w-12 text-right text-sm text-zinc-400">
          {rightPercentage}%
        </span>

      </div>

    </div>
  );
}