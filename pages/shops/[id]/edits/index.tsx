"use client";

import { useRouter } from "next/navigation";
import { useShop, updateShop } from "@/lib/api";
import ShopForm from "@/components/ShopForm";

export default function EditShopPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { shop, isLoading, isError } = useShop(params.id);

  const handleSubmit = async (data: any) => {
    try {
      await updateShop(params.id, data);
      router.push("/shops");
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading shop</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Shop</h1>
      <ShopForm onSubmit={handleSubmit} initialData={shop} />
    </div>
  );
}
