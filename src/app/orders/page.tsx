"use client";
import Image from "next/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
// TruckIcon and CheckCircleIcon now imported above

import ORDERS from "./ordersData";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "In transit", value: "In transit" },
  { label: "Delivered", value: "Delivered" },
  { label: "Returned", value: "Returned" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Last 30 days", value: "last30" },
  { label: "Last 6 months", value: "last6m" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredOrders = ORDERS.filter((order) => {
    const text = (
      order.orderNumber +
      order.date +
      order.total +
      (order.savings || "") +
      order.status +
      order.parcels.map((p) =>
        p.items.map((i) => i.name + i.specs).join("")
      ).join("")
    ).toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      order.status === filter ||
      order.parcels.some((p) => p.status === filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <MobileHeader />
      <div className="bg-white sticky top-0 z-10 text-zinc-900">
        <div className="px-4 pt-4 pb-2 flex flex-col gap-2">
          <button className="flex items-center gap-2 w-fit text-zinc-700 text-lg font-medium bg-transparent border-none p-0 hover:underline focus:underline cursor-pointer rounded-[6px]">
            <ArrowLeftIcon className="w-6 h-6 text-pink-600" />
            <span>Back</span>
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-zinc-900 sm:text-2xl">My orders</h1>
            <button className="border border-zinc-200 rounded-[6px] px-3 py-1 text-sm text-zinc-600">Select items</button>
          </div>
        </div>
          <div className="relative px-4 pb-4 mt-2">
          <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700" strokeWidth={2} style={{ top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search orders, items, or order numbers..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-400 text-base placeholder:text-zinc-700 text-zinc-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 px-4 pb-4 mt-2 overflow-x-auto scrollbar-hide border-b border-zinc-200">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`px-4 py-2 rounded-[6px] border text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-zinc-700 border border-gray-400"
              }`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-zinc-400 py-20">
            <div className="text-5xl mb-4">📦</div>
            <div>No orders found.</div>
          </div>
        ) : (
          filteredOrders.map((order, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <div className="bg-white overflow-hidden border-2 border-black rounded-xl">
                <div className="flex justify-between items-start border-b px-1 py-4">
                  <div className="p-2">
                    <div className="text-zinc-900 text-xl font-bold mb-1 sm:text-xl md:text-xl">Order {order.orderNumber}</div>
                    <div className="text-zinc-700 text-base font-semibold sm:text-base">{order.date}</div>
                    {/* Payment type tag: hide for returned orders, clickable */}
                    {order.status !== "Returned" && (
                      <Link href={`/orders/payment/${encodeURIComponent(order.orderNumber)}`}
                        className={`inline-block mt-2 px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-150 ${order.orderNumber === "#99999-XY-2026" ? "bg-black text-white hover:bg-zinc-800" : "bg-gray-200 text-black hover:bg-gray-300"} flex items-center gap-2`}
                        style={{ textDecoration: 'none' }}
                      >
                        {/* For the prototype, only #99999-XY-2026 is Paid in full, all others are installments */}
                        {order.orderNumber === "#99999-XY-2026"
                          ? "Paid in full"
                          : (
                            <span className="flex items-center gap-2">
                              <span>To Pay in 3 installments</span>
                              <ArrowRightIcon className="w-5 h-5 text-zinc-500" />
                            </span>
                          )
                        }
                      </Link>
                    )}
                  </div>
                  <div className="text-right p-2">
                    {order.status === "Returned" ? (
                      <>
                        <div className="text-sm text-zinc-700 mb-1 sm:text-xs">Refunded amount</div>
                        <div className="text-2xl font-bold text-zinc-900 sm:text-lg">
                          {/* Extract refund value from tracking date string if present */}
                          {(() => {
                            const parcel = order.parcels[0];
                            const match = parcel?.tracking?.date?.match(/£([\d.]+)/);
                            return match ? `£${match[1]}` : order.total;
                          })()}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-zinc-700 mb-1 sm:text-xs">Order total</div>
                        <div className="text-2xl font-bold text-zinc-900 sm:text-lg">{order.total}</div>
                        {order.savings && <div className="text-sm text-green-700 mt-1 sm:text-xs">{order.savings}</div>}
                      </>
                    )}
                  </div>
                </div>
                {order.parcels.map((parcel, pidx) => {
                  // For the first order (with two in-transit parcels), show Parcel 1/2 and 2/2 badges after the In transit tag
                  const showSplitBadge = order.orderNumber === "#99999-XY-2026" && order.parcels.length === 2;
                  let badgeText = "";
                  if (showSplitBadge) {
                    badgeText = pidx === 0 ? "Parcel 1 of 2" : "Parcel 2 of 2";
                  }
                  return (
                    <div
                      key={pidx}
                      className={`px-4 py-4 border-t border-black ${showSplitBadge ? "bg-zinc-50 relative" : (('badge' in parcel && parcel.badge) ? "bg-zinc-50 relative" : "")}`}
                    >
                      {/* Remove left-side thick border for card border style */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            parcel.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : parcel.status === "In transit"
                              ? "bg-orange-100 text-orange-700"
                              : parcel.status === "Returned"
                              ? "bg-purple-100 text-purple-700"
                              : parcel.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-zinc-200 text-zinc-700"
                          }`}
                        >
                          {parcel.status}
                        </span>
                        {showSplitBadge && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                            {badgeText}
                          </span>
                        )}
                        {/* fallback for legacy badge property */}
                        {!showSplitBadge && 'badge' in parcel && parcel.badge && (
                          <span className="bg-blue-100 text-black px-2 py-1 rounded-full text-xs font-semibold">
                            {parcel.badge}
                          </span>
                        )}
                      </div>
                      {parcel.expected && (
                        <div className="bg-zinc-50 px-5 py-4 mb-3 flex flex-col">
                          <div className="font-bold text-lg text-black mb-1">Expected Delivery in {parcel.expected}</div>
                          {parcel.tracking?.date && (
                            <div className="text-base text-zinc-500 font-normal">Estimated {parcel.tracking.date.replace('Arriving by ', '')}</div>
                          )}
                        </div>
                      )}
                      {parcel.items.map((item, iidx) => (
                        <div key={iidx} className="flex flex-col gap-2 mb-3 pb-3 last:mb-0 last:pb-0">
                          <div className="flex gap-3">
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
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-base font-bold text-zinc-900 sm:text-sm">
                                    {item.price}
                                  </span>
                                  {item.original && (
                                    <span className="text-sm text-zinc-500 line-through sm:text-xs">
                                      {item.original}
                                    </span>
                                  )}
                                  {item.discount && (
                                    <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded sm:text-xs">
                                      {item.discount}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {(parcel.status === "In transit" || parcel.status === "Returned") && (
                                <div className="mt-5 pt-3 flex items-center gap-4">
                                  <button className="text-sm font-semibold text-zinc-500 hover:text-gray-600 transition-colors border-t border-zinc-400 pt-2">Write review</button>
                                  {parcel.status === "In transit" && (
                                    <button className="text-sm font-semibold text-zinc-500 hover:text-gray-600 transition-colors border-t border-zinc-400 pt-2">Cancel item</button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-2">
                        {parcel.status === "In transit" && (
                          <Link href={`/orders/track/${encodeURIComponent(order.orderNumber)}/${pidx}`} className="flex-1">
                            <button
                              className="w-full bg-[#006700] border-[#006700] border text-white py-2 rounded-[6px] font-semibold text-center"
                              style={{ backgroundColor: '#006700', borderColor: '#006700' }}
                            >
                              Track parcel
                            </button>
                          </Link>
                        )}
                        {parcel.status !== "In transit" && (
                          <button className="flex-1 border border-black bg-white text-black py-2 font-semibold text-center rounded-[6px]">
                            {parcel.status === "Delivered"
                              ? "Return items"
                              : parcel.status === "Returned"
                              ? "View return details"
                              : "View details"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {/*order.status === "Split" && (
                  <div className="text-black text-center py-3 cursor-pointer font-medium">
                    View complete order summary
                  </div>
                )*/}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
