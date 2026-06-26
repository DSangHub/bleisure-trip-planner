import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-line bg-panel/95 p-8 text-center shadow-glow">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-mist">
        The page you are looking for does not exist in this trip planner.
      </p>
      <div className="mt-6 flex justify-center">
        <Link href="/">
          <Button variant="primary">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
