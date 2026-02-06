"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// Example parcel data for the track page
const PARCEL = {
  expectedTime: "11:15 and 13:15",
  expectedDate: "Monday 2nd Feb",
  items: [
    {
      name: "Radley Series 5 Stone And Teal Silicone Strap Smartwatch TFT Calling",
      specs: "Color: Stone/Teal • Qty: ×1",
      price: "£85.00",
      image: "/Radley_Series_5_Stone_And_Teal_Silicone_Strap_Smartwatch_TFT_Calling.webp",
    },
    {
      name: "Calvin Klein Thong Pink",
      specs: "Color: Pink • Qty: ×1",
      price: "£57.00",
      image: "/Calvin_Klein_Thong_Pink.webp",
    },
  ],
};

export default function TrackParcelPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white sticky top-0 z-10 text-zinc-900">
        <div className="px-4 pt-4 pb-2 flex flex-col gap-2">
          <button className="flex items-center gap-2 w-fit text-zinc-700 text-lg font-medium bg-transparent border-none p-0 hover:underline focus:underline cursor-pointer rounded-[6px]">
            <ArrowLeftIcon className="w-6 h-6 text-pink-600" />
            <span>Back to order</span>
          </button>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-2xl mt-2">Parcel is out for delivery</h1>
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="bg-zinc-50 rounded-lg p-5 mb-6">
          <div className="text-lg font-semibold text-black mb-2">Your items are out for delivery.</div>
          <div className="text-base text-zinc-700 mb-1">Expected delivery time between:</div>
          <div className="text-xl font-bold text-zinc-900 mb-1">{PARCEL.expectedTime}</div>
          <div className="text-base text-zinc-700 mb-1">on</div>
          <div className="text-lg font-semibold text-zinc-900">{PARCEL.expectedDate}</div>
        </div>
        <div className="mb-6">
          {PARCEL.items.map((item, idx) => (
            <div key={idx} className="flex gap-3 mb-5 items-center">
              <img
                src={item.image}
                alt="Item"
                className="w-[72px] h-[72px] rounded-lg object-cover bg-zinc-100"
              />
              <div className="flex-1">
                <div className="text-base font-semibold text-zinc-900 mb-1 sm:text-sm">
                  {item.name}
                </div>
                <div className="text-sm text-zinc-700 mb-1 sm:text-xs">{item.specs}</div>
                <span className="text-base font-bold text-zinc-900 sm:text-sm">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-[#006700] border-[#006700] border text-white py-3 rounded-[6px] font-semibold text-center text-lg">
          Go to Carrier Tracking -&gt;
        </button>
      </div>
    </div>
  );
}
