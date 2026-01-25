import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150 mt-3">
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4">
        {/*MOBILE HEADER*/}
        <div className="md:hidden flex flex-col gap-3 py-3">
          {/* Row 1: Logo + Profile */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Blocks className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">
                Code Editor
              </span>
               <span className="block text-xs text-blue-400/60 font-medium">
                  Interactive Coding Platform
               </span>
            </Link>
            <HeaderProfileBtn />
          </div>

          {/* Row 2: Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Link
              href="/snippets"
              className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-300 bg-gray-800/50 border border-gray-800"
            >
              <Code2 className="w-4 h-4" />
              Snippets
            </Link>
            <SignedOut>
              <Link
                href="/pricing"
                className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-amber-500/20 bg-amber-500/10"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pro
              </Link>
            </SignedOut>
          </div>
        </div>
        <div className="relative h-16 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="absolute -inset-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              {/* Logo Hover effect */}
              <div className="relative bg-linear-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Blocks className="w-6 h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div>
                <span className="block text-lg font-semibold bg-linear-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  Code Editor
                </span>
                <span className="block text-xs text-blue-400/60 font-medium">
                  Interactive Coding Platform
                </span>
              </div>
            </Link>

            {/* snippets Link */}
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 
              border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <Code2 className="w-4 h-4 relative z-10" />
              <span className="text-sm font-medium relative z-10">Snippets</span>
            </Link>
          </div>

          {/* right rection */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 bg-linear-to-r from-amber-500/10 to-orange-500/10"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400/90">
                  Pro
                </span>
              </Link>
            </SignedOut>

            {/* profile button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
