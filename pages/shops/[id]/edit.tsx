import { useRouter } from "next/router";
import { ShopForm } from "@/components/ShopForm";
import { useShop, updateShop } from "@/lib/api";

export default function EditShop() {
  const router = useRouter();
  const { id } = router.query;
  const { shop, isLoading, isError } = useShop(id as string);

  const handleUpdateShop = async (data: any) => {
    await updateShop(id as string, data);
    router.push("/shops");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading shop</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Shop</h1>
      <ShopForm initialData={shop} onSubmit={handleUpdateShop} />
    </div>
  );
}
