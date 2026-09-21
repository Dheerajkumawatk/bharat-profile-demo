import {
  Building2,
  Droplets,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPin,
  Play,
  Sprout,
  TowerControl,
  TreePine,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  road: Wrench,
  water: Droplets,
  school: GraduationCap,
  health: HeartPulse,
  meeting: Users,
  farm: Sprout,
  tank: TowerControl,
  tree: TreePine,
  building: Building2,
  landmark: Landmark,
  pin: MapPin,
};

const GRADIENTS = [
  "from-navy to-navy-light",
  "from-saffron to-saffron-dark",
  "from-navy-light to-navy",
  "from-saffron-dark to-navy",
];

function hashString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function PlaceholderImage({
  icon = "landmark",
  label,
  seed,
  video,
  className = "",
}: {
  icon?: keyof typeof ICONS;
  label?: string;
  seed?: string;
  video?: boolean;
  className?: string;
}) {
  const Icon = ICONS[icon] ?? Landmark;
  const gradient = GRADIENTS[hashString(seed ?? label ?? icon) % GRADIENTS.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`grid-${seed ?? icon}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#grid-${seed ?? icon})`} />
      </svg>
      <div className="relative flex flex-col items-center gap-2 px-4 text-center text-white">
        <Icon className="h-10 w-10 opacity-90 sm:h-12 sm:w-12" strokeWidth={1.5} />
        {label && (
          <span className="text-xs font-medium opacity-90 sm:text-sm">{label}</span>
        )}
      </div>
      {video && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg sm:h-14 sm:w-14">
            <Play className="ml-1 h-5 w-5 fill-navy text-navy sm:h-6 sm:w-6" />
          </div>
        </div>
      )}
    </div>
  );
}
