import { useRouter } from "next/router";
import { ShopForm } from "@/components/ShopForm";
import { createShop } from "@/lib/api";

export default function NewShop() {
  const router = useRouter();

  const handleCreateShop = async (data: any) => {
    await createShop(data);
    router.push("/shops");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Shop</h1>
      <ShopForm onSubmit={handleCreateShop} />
    </div>
  );
}
