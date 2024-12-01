import { useRouter } from "next/router";
import Link from "next/link";
import { useShop } from "@/lib/api";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function ShopDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { shop, isLoading, isError } = useShop(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading shop</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{shop.name}</h1>
      <p className="mb-4">{shop.description}</p>
      {shop.logo && (
        <Image
          src={shop.logo}
          alt={`${shop.name} logo`}
          className="w-32 h-32 object-contain mb-4"
          width={128}
          height={128}
        />
      )}
      <Link
        href={`/shops/${id}/edit`}
        className="text-blue-500 hover:underline"
      >
        Edit Shop
      </Link>
      <h2 className="text-2xl font-bold mt-8 mb-4">Products</h2>
      <Link
        href={`/products/new?shopId=${id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Product
      </Link>
      {/* Pass shopId to the ProductList component */}
      <ProductList shopId={id as string} />
    </div>
  );
}
