import { useState } from "react";
import Link from "next/link";
import { useProducts, deleteProduct } from "../../../lib/api";
import { Product } from "../../../types";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { products, totalPages, isLoading, isError, mutate } = useProducts(
    page,
    10,
    search,
    sort
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        mutate();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSort = (field: string) => {
    setSort(field === sort ? `-${field}` : field);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <Link
        href="/products/new"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Product
      </Link>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              Stock
            </th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price.toFixed(2)}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`mx-1 px-3 py-1 rounded ${
              pageNum === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}
