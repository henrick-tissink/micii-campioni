type WaveColor =
  | "white"
  | "sand"
  | "cream"
  | "lagoon"
  | "lagoon-dark"
  | "foundation";

type WaveVariant = "default" | "subtle";

interface WaveDividerProps {
  color?: WaveColor;
  flip?: boolean;
  variant?: WaveVariant;
}

const colorClasses: Record<WaveColor, string> = {
  white: "text-white",
  sand: "text-sand-50",
  cream: "text-cream",
  lagoon: "text-lagoon-50",
  "lagoon-dark": "text-lagoon-600",
  foundation: "text-lagoon-foundation",
};

export function WaveDivider({
  color = "white",
  flip = false,
  variant = "default",
}: WaveDividerProps) {
  const isSubtle = variant === "subtle";
  const heightClass = isSubtle ? "h-6 md:h-8" : "h-10 md:h-[60px]";
  // Subtle variant uses a smaller-amplitude path inside the same 60-unit viewBox
  const pathD = isSubtle
    ? "M0 38C240 26 480 50 720 38C960 26 1200 50 1440 38V60H0V38Z"
    : "M0 30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0V30Z";

  return (
    <div
      className={`${colorClasses[color]} ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        className={`block w-full ${heightClass}`}
        viewBox="0 0 1440 60"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={pathD} fill="currentColor" />
      </svg>
    </div>
  );
}
