import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3 роки Християнського Клубу Підприємців",
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
        <div id="scroll-root">{children}</div>
      </body>
    </html>
  );
}
