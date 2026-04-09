import type { Metadata } from "next";
import "./globals.css";
import NoOverscroll from "./components/NoOverscroll";
import PhoneFrame from "./components/PhoneFrame";

export const metadata: Metadata = {
  title: "Християнський Клуб Підприємців",
  description:
    "Запрошення на святкування 3-річчя ХКП — 18 квітня, Київ. Час єдності, вдячності та нового бачення.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <NoOverscroll />
        <PhoneFrame>
          {children}
        </PhoneFrame>
      </body>
    </html>
  );
}
