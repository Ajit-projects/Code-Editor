"use client";

import NavigationHeader from "@/components/NavigationHeader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

export default function PaymentSuccess() {
  const router = useRouter();
  const { user } = useUser();

  const dbuser = useQuery(api.users.getUser, {
    userId: user?.id ?? "",
  });

  useEffect(() => {
    if (dbuser?.isPro) {
      router.push("/");
    }
  }, [dbuser, router]);

  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <NavigationHeader />

      <div className="relative px-4 h-[80vh] flex items-center justify-center">
        <div className="relative max-w-xl mx-auto text-center">
          {/* Glow lines */}
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/30 to-purple-500/30 blur-2xl opacity-10" />

          {/* Card */}
          <div className="relative bg-[#12121a]/90 border border-gray-800/50 backdrop-blur-2xl rounded-2xl p-12">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />

            <div className="relative">
              <h1 className="text-3xl font-semibold text-white mb-3">
                Finalizing Your Upgrade
              </h1>

              <p className="text-gray-400 mb-8 text-lg">
                Your Pro features are being activated.  
                Hang tight… 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
