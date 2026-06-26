import { PLATFORM_DATA_NOTE } from "@/lib/travel-platforms";

export function PlatformDataNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-mist ${className}`}>
      {PLATFORM_DATA_NOTE}
    </p>
  );
}
