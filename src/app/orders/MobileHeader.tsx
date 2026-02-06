"use client";
import Image from "next/image";
import { Bars3Icon, MagnifyingGlassIcon, UserCircleIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
export default function MobileHeader() {
  return (
    <nav className="flex items-center px-2 py-2 bg-white border-b border-zinc-100 md:hidden">
      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <Bars3Icon className="w-7 h-7 text-black" />
        <span className="text-xs text-zinc-600 mt-1 font-semibold">Menu</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        <Image src="/verylogo.svg" alt="Very Logo" width={40} height={40} />
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <div className="flex flex-col items-center">
          <MagnifyingGlassIcon className="w-7 h-7 text-black" />
          <span className="text-xs text-zinc-600 mt-1 font-semibold">Search</span>
        </div>
        <div className="flex flex-col items-center">
          <UserCircleIcon className="w-7 h-7 text-black" />
          <span className="text-xs text-zinc-600 mt-1 font-semibold">Account</span>
        </div>
        <div className="flex flex-col items-center">
          <HeartIcon className="w-7 h-7 text-black" />
          <span className="text-xs text-zinc-600 mt-1 font-semibold">Saved</span>
        </div>
        <div className="flex flex-col items-center">
          <ShoppingBagIcon className="w-7 h-7 text-black" />
          <span className="text-xs text-zinc-600 mt-1 font-semibold">Basket</span>
        </div>
      </div>
    </nav>
  );
}
