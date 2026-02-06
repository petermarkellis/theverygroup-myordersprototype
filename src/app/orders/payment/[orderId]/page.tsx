"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import MobileHeader from "../../MobileHeader";
import ORDERS from "../../ordersData"
import Image from "next/image";

type PaymentInstallment = { label: string; amount: string; due: string; status: string };
type PaymentMock = {
  [orderId: string]: { type: string; total: string; installments: PaymentInstallment[]; directDebit?: string };
};

// Mock payment data for demonstration
const PAYMENT_MOCK: PaymentMock = {
  "#99999-XY-2026": {
    type: "Paid in full",
    total: "£142.00",
    installments: [],
  },
  "#94567-GH-5523": {
    type: "To Pay in 3 installments",
    total: "£54.95",
    installments: [
      { label: "Installment 1", amount: "£15.99", due: "30th Feb 2026", status: "Paid" },
      { label: "Installment 2", amount: "£15.99", due: "30th Mar 2026", status: "Upcoming" },
      { label: "Installment 3", amount: "£15.99", due: "30th Apr 2026", status: "Upcoming" },
    ],
    directDebit: "****7288",
  },
};

export default function PaymentDetailsPage() {
  const params = useParams();
  const { orderId } = params;
  const order = ORDERS.find(o => o.orderNumber === decodeURIComponent(orderId as string));
  // For the prototype: only #99999-XY-2026 is "Paid in full", all others are installments
  const isPaidInFull = decodeURIComponent(orderId as string) === "#99999-XY-2026";
  const payment = isPaidInFull
    ? PAYMENT_MOCK["#99999-XY-2026"]
    : PAYMENT_MOCK["#94567-GH-5523"];

  return (
    <div className="min-h-screen bg-white pb-20 px-2 sm:px-4">
      <MobileHeader />
      <div className="max-w-2xl mx-auto pt-8">
        <Link href="/orders" className="text-pink-600 hover:underline font-medium">&larr; Back to orders</Link>
        <div className="flex flex-col gap-1 mt-4 mb-2">
          <div className="text-2xl font-bold text-black">Order {order?.orderNumber}</div>
          <div className="text-base text-zinc-500">Placed {order?.date}</div>
        </div>
        {/* Items section */}
        <div className="bg-zinc-50 rounded-lg p-4 mb-4">
          <div className="text-xs font-bold text-zinc-500 mb-2 tracking-widest">ITEMS</div>
          {order?.parcels.flatMap((parcel) => parcel.items).map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 mb-3 last:mb-0">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-zinc-200">
                <Image src={item.image} alt={item.name} width={56} height={56} className="object-contain w-full h-full" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-zinc-900 text-base mb-1">{item.name}</div>
                <div className="text-sm text-zinc-600">{item.specs}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-zinc-900 text-base">{item.price}</div>
                {item.original && <div className="text-xs text-zinc-400 line-through">{item.original}</div>}
                {item.discount && <div className="text-xs text-green-700">{item.discount}</div>}
              </div>
            </div>
          ))}
        </div>
        {/* Pay Later info block */}
        {!isPaidInFull && (
          <div className="flex items-center gap-3 bg-[#FFEFF8] rounded-lg p-4 mb-4">
              <div className="w-7 h-7 flex items-center justify-center">
                <Image src="/verylogo.svg" alt="Very Logo" width={24} height={24} className="object-contain" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-blue-900 text-sm mb-1">VERY PAY LATER</div>
              <div className="text-sm text-blue-900">This order is set to Pay Later. {order?.total} is split across 3 monthly installments.</div>
            </div>
          </div>
        )}
        {/* Outstanding balance block */}
        {!isPaidInFull && (
          <div className="rounded-lg mb-4 p-5 border-2 border-black">
            <div className="text-xs font-bold text-black mb-2 tracking-widest">OUTSTANDING BALANCE</div>
            <div className="text-3xl font-bold text-black mb-1">£83.00</div>
            <div className="text-black text-sm mb-4">Pay off early to avoid future interest.</div>
            <button className="w-full bg-black text-white py-2 rounded font-bold text-lg hover:bg-gray-900 transition-colors">Pay off now – £83.00</button>
          </div>
        )}
        {/* Payment schedule */}
        {!isPaidInFull && (
          <div className="bg-zinc-50 rounded-lg p-5 mb-4">
            <div className="text-xs font-bold text-zinc-500 mb-4 tracking-widest">PAYMENT SCHEDULE</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                <div className="flex-1">
                  <div className="text-sm text-zinc-900">14 Feb 2026 – 1st payment</div>
                  <div className="font-bold text-green-700">£41.50</div>
                </div>
                <span className="text-xs font-semibold text-green-700 bg-green-100 rounded px-2 py-1">Paid</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                <div className="flex-1">
                  <div className="text-sm text-zinc-900">14 Mar 2026 – 2nd payment</div>
                  <div className="font-bold text-blue-700">£41.50</div>
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 rounded px-2 py-1">Due now</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <span className="w-3 h-3 rounded-full bg-zinc-300 inline-block"></span>
                <div className="flex-1">
                  <div className="text-sm text-zinc-900">14 Apr 2026 – 3rd payment</div>
                  <div className="font-bold text-zinc-700">£41.50</div>
                </div>
                <span className="text-xs font-semibold text-zinc-700 bg-zinc-200 rounded px-2 py-1">Upcoming</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="font-semibold text-zinc-700">Remaining</span>
              <span className="font-bold text-black text-lg">£83.00</span>
            </div>
          </div>
        )}
        {/* APR info */}
        {!isPaidInFull && (
          <div className="bg-zinc-100 rounded-lg p-3 text-sm text-zinc-600 mt-2">
            Representative APR 39.9%. Interest applies to any balance remaining after the interest-free period. Full terms apply.
          </div>
        )}
        {/* Paid in full message */}
        {isPaidInFull && (
          <div className="bg-zinc-50 rounded-lg p-5 mb-6">
            <div className="text-lg font-semibold text-green-700">This order was paid in full.</div>
          </div>
        )}
      </div>
    </div>
  );
}
