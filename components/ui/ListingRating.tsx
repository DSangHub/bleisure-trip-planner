import { formatReviewCount } from "@/lib/travel-platforms";

export function ListingRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <p className="text-xs text-mist">
      <span className="font-semibold text-amber-200">★ {rating.toFixed(1)}</span>
      <span className="text-mist"> · {formatReviewCount(reviewCount)} reviews</span>
    </p>
  );
}
