import Link from "next/link";
import ShopList from "@/components/ShopList";

export default function ShopsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shops Management</h1>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Back To Dashboard
        </Link>
        <Link
          href="/shops/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Shop
        </Link>
      </div>
      <ShopList />
    </div>
  );
}
