"use client";

import { useRouter } from "next/navigation";
import { useProduct, updateProduct } from "@/lib/api";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { product, isLoading, isError } = useProduct(params.id);

  const handleSubmit = async (data: any) => {
    try {
      await updateProduct(params.id, data);
      router.push("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm onSubmit={handleSubmit} initialData={product} />
    </div>
  );
}
