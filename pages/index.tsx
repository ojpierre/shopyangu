import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to ShopYangu Admin Panel
      </h1>
      <nav className="flex gap-4">
        <Link href="/shops" className="text-blue-500 hover:underline">
          Manage Shops
        </Link>
        <Link href="/products" className="text-blue-500 hover:underline">
          Manage Products
        </Link>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Dashboard
        </Link>
      </nav>
    </main>
  );
}
