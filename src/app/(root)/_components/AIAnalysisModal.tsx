"use client";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function AIAnalysisModal({
  result,
  onClose,
}: {
  result: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-3xl bg-[#12121a] border border-white/10 rounded-xl p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Analysis
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white cursor-pointer" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
          {result}
        </div>
      </motion.div>
    </div>
  );
}
