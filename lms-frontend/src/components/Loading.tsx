import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background/50 fixed inset-0 flex items-center justify-center gap-2">
      <Loader2 className="h-6 w-6 animate-spin text-[#7878fc]" />
      <span className="text-sm font-medium text-[#7878fc]">Loading...</span>
    </div>
  );
}
