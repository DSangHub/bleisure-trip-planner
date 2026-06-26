import type { TravelPlatform } from "@/lib/travel-platforms";
import { getPlatformBadgeClass, getPlatformLabel } from "@/lib/travel-platforms";

export function PlatformBadge({ platform }: { platform: TravelPlatform }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getPlatformBadgeClass(platform)}`}
    >
      {getPlatformLabel(platform)}
    </span>
  );
}
