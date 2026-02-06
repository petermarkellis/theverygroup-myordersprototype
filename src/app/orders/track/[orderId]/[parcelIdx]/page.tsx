"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import MobileHeader from "../../../MobileHeader";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ORDERS from "../../../../orders/ordersData";
import { useParams } from "next/navigation";

export default function TrackParcelPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const parcelIdx = params.parcelIdx as string;
  // Find the order by orderNumber
  const order = ORDERS.find(o => o.orderNumber === decodeURIComponent(orderId));
  if (!order) return notFound();
  const parcel = order.parcels[parseInt(parcelIdx, 10)];
  if (!parcel) return notFound();

  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader />
      <div className="bg-white sticky top-0 z-10 text-zinc-900">
        <div className="px-4 pt-4 pb-2 flex flex-col gap-2">
          <Link href="/orders">
            <button className="flex items-center gap-2 w-fit text-zinc-700 text-lg font-medium bg-transparent border-none p-0 hover:underline focus:underline cursor-pointer rounded-[6px]">
              <ArrowLeftIcon className="w-6 h-6 text-pink-600" />
              <span>Back to order</span>
            </button>
          </Link>
          {/* Header row: left = order info/payment, right = status/parcel */}
          <div className="flex flex-row justify-between items-start mt-2">
            <div>
              <div className="text-zinc-800 text-xl font-semibold mb-1">Order #{order.orderNumber}</div>
              <div className="text-zinc-700 text-sm mb-1">Placed on {order.date}</div>
            </div>
            <div className="flex flex-col items-end gap-1 min-w-[120px]">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${parcel.status === "Delivered" ? "bg-green-100 text-green-700" : parcel.status === "In transit" ? "bg-orange-100 text-orange-700" : parcel.status === "Returned" ? "bg-purple-100 text-purple-700" : parcel.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-zinc-200 text-zinc-700"}`}>{parcel.status}</span>
              {order.parcels.length > 1 && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold mt-1">Parcel {parseInt(parcelIdx, 10) + 1} of {order.parcels.length}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="bg-zinc-50 rounded-lg p-5 mb-6">
          <div className="text-lg font-semibold text-black mb-2">Your items are out for delivery.</div>
          <div className="text-base text-zinc-700 mb-1">Expected delivery time between:</div>
          <div className="text-xl font-bold text-zinc-900 mb-1">11:15 and 13:15</div>
          <div className="text-base text-zinc-700 mb-1">on</div>
          <div className="text-lg font-semibold text-zinc-900 mb-4">Monday 2nd Feb</div>
          <div className="mt-2 pt-2 border-t border-zinc-200">
            <div className="text-sm text-zinc-700 font-medium">Will be Delivered to:</div>
            <div className="text-base text-black font-semibold">12 Watergate Street<br/>Chester<br/>CH1 2LA<br/>United Kingdom</div>
          </div>
        </div>
        <div className="mb-6">
          {parcel.items.map((item, idx) => (
            <div key={idx} className="flex gap-3 mb-5 items-start">
              <img
                src={item.image}
                alt="Item"
                className="w-[72px] h-[72px] rounded-lg object-cover bg-zinc-100"
              />
              <div className="flex-1 min-w-0 flex flex-col h-full justify-between">
                <div>
                  <div className="text-base font-semibold text-zinc-900 mb-1 sm:text-sm">
                    {item.name}
                  </div>
                  <div className="text-sm text-zinc-700 mb-1 sm:text-xs">{item.specs}</div>
                  <span className="text-base font-bold text-zinc-900 sm:text-sm">{item.price}</span>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        {/* Tracking history mock section */}
        <div className="mb-8">
          <div className="border-t border-zinc-200 mt-10 mb-8"></div>
          <h2 className="text-2xl font-bold mb-4 text-black">Tracking history</h2>
          <div className="space-y-6 text-black">
            {/* Friday 21st October */}
            <div>
              <div className="font-bold text-lg mb-2">Friday 21st October</div>
              <div className="flex items-start mb-1">
                <div className="w-16 font-bold text-base">09:15</div>
                <div className="text-base">Your parcel is with your driver</div>
              </div>
              <div className="flex items-start">
                <div className="w-16 font-bold text-base">07:42</div>
                <div className="text-base">Received into Warrington</div>
              </div>
            </div>
            {/* Thursday 20th October */}
            <div>
              <div className="font-bold text-lg mb-2 mt-4">Thursday 20th October</div>
              <div className="flex items-start mb-1">
                <div className="w-16 font-bold text-base">18:02</div>
                <div className="text-base">Despatched from warehouse</div>
              </div>
              <div className="flex items-start mb-1">
                <div className="w-16 font-bold text-base">16:55</div>
                <div className="text-base">Sorted at Skygate</div>
              </div>
              <div className="flex items-start mb-1">
                <div className="w-16 font-bold text-base">15:10</div>
                <div className="text-base">Delivery details updated</div>
              </div>
              <div className="flex items-start mb-1">
                <div className="w-16 font-bold text-base">13:22</div>
                <div className="text-base">Parcel being packed</div>
              </div>
              <div className="flex items-start">
                <div className="w-16 font-bold text-base">11:03</div>
                <div className="text-base">Order being processed at warehouse</div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-[#006700] border-[#006700] border text-white py-3 rounded-[6px] font-semibold text-center text-lg flex items-center justify-center gap-2">
          <span>Go to Carrier Tracking</span>
          <ArrowRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
