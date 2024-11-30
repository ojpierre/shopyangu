import { useRouter } from "next/router";
import { ProductForm } from "@/components/ProductForm";
import { createProduct } from "@/lib/api";

export default function NewProduct() {
  const router = useRouter();
  const { shopId } = router.query;

  const handleCreateProduct = async (data: any) => {
    await createProduct(data);
    router.push(shopId ? `/shops/${shopId}` : "/products");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <ProductForm
        onSubmit={handleCreateProduct}
        initialData={{ shopId: shopId as string }}
      />
    </div>
  );
}
