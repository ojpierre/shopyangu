"use client";

import { useState } from "react";
import { useShops, deleteShop } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShopList() {
  const router = useRouter();
  const { shops, isLoading, isError, mutate } = useShops();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shopToDelete, setShopToDelete] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading shops</div>;

  const handleDelete = async () => {
    if (shopToDelete) {
      try {
        await deleteShop(shopToDelete);
        mutate();
        setShowDeleteModal(false);
        setShopToDelete(null);
      } catch (error) {
        console.error("Error deleting shop:", error);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop: any) => (
          <div key={shop.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{shop.name}</h2>
            <p className="text-gray-600">{shop.description}</p>
            <div className="mt-4 flex justify-between">
              <div>
                <Link
                  href={`/shops/${shop.id}`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  View
                </Link>
                <Link
                  href={`/shops/${shop.id}/edit`}
                  className="text-green-500 hover:underline"
                >
                  Edit
                </Link>
              </div>
              <button
                onClick={() => {
                  setShopToDelete(shop.id);
                  setShowDeleteModal(true);
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this shop?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
