"use client";

import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
      <Loader2 className="w-10 h-10 text-white animate-spin" />
    </div>
  );
}
