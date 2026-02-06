// TypeScript types for order data
export type OrderItem = {
  name: string;
  specs: string;
  price: string;
  image: string;
  original?: string;
  discount?: string;
};

export type Parcel = {
  status: string;
  expected?: string;
  badge?: string;
  tracking: {
    icon: string;
    status: string;
    date: string;
  };
  items: OrderItem[];
};

export type Order = {
  orderNumber: string;
  date: string;
  total: string;
  status: string;
  savings?: string;
  parcels: Parcel[];
};

const ORDERS: Order[] = [
    // Example order with two parcels in transit
    {
      orderNumber: "#99999-XY-2026",
      date: "31 January 2026",
      total: "£142.00",
      status: "In transit",
      parcels: [
        {
          status: "In transit",
          expected: "Tomorrow",
          tracking: {
            icon: "🚚",
            status: "Out for delivery",
            date: "Delivery between 9am and 11:30am",
          },
          items: [
            {
              name: "Radley Series 5 Stone And Teal Silicone Strap Smartwatch TFT Calling",
              specs: "Color: Stone/Teal • Qty: ×1",
              price: "£85.00",
              image: "/Radley_Series_5_Stone_And_Teal_Silicone_Strap_Smartwatch_TFT_Calling.webp",
            },
            {
              name: "Nike Everyday Plus Cushioned Socks 3 Pack",
              specs: "Color: White/Black • Qty: ×1",
              price: "£14.00",
              image: "/Nike_Everyday_Plus_Cushioned_Socks_3_Pack.webp",
            },
          ],
        },
        {
          status: "In transit",
          expected: "2-3 days",
          tracking: {
            icon: "🚚",
            status: "In transit",
            date: "Arriving by Friday",
          },
          items: [
            {
              name: "Calvin Klein Thong Pink",
              specs: "Color: Pink • Qty: ×1",
              price: "£57.00",
              image: "/Calvin_Klein_Thong_Pink.webp",
            },
          ],
        },
      ],
    },
  {
    orderNumber: "#96723-AJ-3458",
    date: "14 October 2025",
    total: "£67.98",
    status: "In transit",
    parcels: [
      {
        status: "In transit",
        expected: "on Fri 4th Feb",
        tracking: {
          icon: "🚚",
          status: "Awaiting delivery estimate",
          date: "",
        },
        items: [
          {
            name: "FP Movement Flirt On Shorts Burgundy",
            specs: "Size: 6-12M • Qty: ×1",
            price: "£33.99",
            original: "£39.99",
            discount: "15% off",
            image: "/FP_Movement_Womens_Training_Get_Your_Flirt_On_Shorts_Burgundy.webp",
          },
          {
            name: "New Balance 327 Trainers Pewter",
            specs: "Size: S • Qty: ×1",
            price: "£33.99",
            image: "/New_Balanc_Womens_327_Trainers_Pewter.webp",
          },
        ],
      },
    ],
  },
  {
    orderNumber: "#96721-KL-2941",
    date: "7 October 2025",
    total: "£124.50",
    savings: "Saved £18.50",
    status: "Split",
    parcels: [
      {
        status: "Delivered",
        badge: "Parcel 1 of 2",
        tracking: {
          icon: "✓",
          status: "Delivered",
          date: "9 Oct 2025, 2:15pm • Left with neighbor",
        },
        items: [
          {
            name: "Pour Moi Leopard Mesh Leggings",
            specs: "Color: Gold • Qty: ×1",
            price: "£45.00",
            image: "/Pour_Moi_Energy_Leopard_Mesh_Insert_Sports_Leggings.webp",
          },
        ],
      },
      {
        status: "In transit",
        badge: "Parcel 2 of 2",
        expected: "2-3 days",
        tracking: {
          icon: "🚚",
          status: "In transit",
          date: "Arriving by Wednesday",
        },
        items: [
          {
            name: "Under Armour Motion Tank Black",
            specs: "Size: M • Qty: ×1",
            price: "£67.00",
            original: "£85.00",
            discount: "21% off",
            image: "/UNDER_ARMOUR_Womens_Training_Motion_Tank_Black.webp",
          },
          {
            name: "Adidas Tracksuit Pants Brown",
            specs: "Size: UK 8 • Qty: ×1",
            price: "£12.50",
            original: "£17.50",
            discount: "29% off",
            image: "/adidas_Originals_Womens_Adicolor_Tracksuit_Pants_with_Satin_Wide_Leg_Brown.webp",
          },
        ],
      },
    ],
  },
  {
    orderNumber: "#95811-BC-8821",
    date: "3 October 2025",
    total: "£29.99",
    status: "Delivered",
    parcels: [
      {
        status: "Delivered",
        tracking: {
          icon: "✓",
          status: "Delivered",
          date: "5 Oct 2025, 11:45am • Left in safe place",
        },
        items: [
          {
            name: "Adidas Running Essentials Tights Navy",
            specs: "Qty: ×1",
            price: "£29.99",
            image: "/adidas_Womens_Running_Adi365_Essentials_Tights_Navy.webp",
          },
        ],
      },
    ],
  },
  {
    orderNumber: "#94567-GH-5523",
    date: "28 September 2025",
    total: "£0.00",
    status: "Returned",
    parcels: [
      {
        status: "Returned",
        tracking: {
          icon: "↩",
          status: "Refund processed",
          date: "2 Oct 2025 • £45.00 refunded to card",
        },
        items: [
          {
            name: "Adidas Sportswear Cozy Sweatshirt Brown",
            specs: "Size: M • Qty: ×1",
            price: "£45.00",
            image: "/adidas_sportswear_cozy_sweatshirt_brown.webp",
          },
        ],
      },
    ],
  },
];

export default ORDERS;
