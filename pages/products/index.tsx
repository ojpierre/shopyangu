import Link from "next/link";
import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  // Replace this with a valid shopId if applicable.
  const shopId = "default-shop-id"; // Update with actual logic or state management

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Link
          href="/products/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Product
        </Link>
      </div>
      {/* Pass the required shopId prop */}
      <ProductList shopId={shopId} />
    </div>
  );
}
