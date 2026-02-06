import OrdersPage from "./orders/page";

export const metadata = {
  title: "The Very Group - Design Prototype - Peter Ellis",
  description: "Design prototype",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", type: "image/x-icon" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return <OrdersPage />;
}
