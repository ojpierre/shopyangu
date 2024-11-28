import { Inter } from "next/font/google";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopYangu Admin Panel",
  description:
    "Admin panel for managing shops and products on ShopYangu platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
