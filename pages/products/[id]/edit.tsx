import { useRouter } from "next/router";
import { ProductForm } from "@/components/ProductForm";
import { useProduct, updateProduct } from "@/lib/api";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { product, isLoading, isError } = useProduct(id as string);

  const handleUpdateProduct = async (data: any) => {
    await updateProduct(id as string, data);
    router.push(`/shops/${product.shopId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
    </div>
  );
}
