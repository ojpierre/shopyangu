"use client";

import { useShops, useProducts } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Shop = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  stockLevel: number;
  shopId: string;
};

export default function Dashboard() {
  const { shops, isLoading: isLoadingShops } = useShops();
  const { products, isLoading: isLoadingProducts } = useProducts();

  if (isLoadingShops || isLoadingProducts) return <div>Loading...</div>;

  const totalShops = shops.length;
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum: number, product: Product) => sum + product.price * product.stockLevel,
    0
  );

  const totalStock = products.reduce(
    (sum: number, product: Product) => sum + product.stockLevel,
    0
  );

  const stockStatusData = [
    {
      name: "In Stock",
      value: products.filter((p: Product) => p.stockLevel > 5).length,
    },
    {
      name: "Low Stock",
      value: products.filter(
        (p: Product) => p.stockLevel > 0 && p.stockLevel <= 5
      ).length,
    },
    {
      name: "Out of Stock",
      value: products.filter((p: Product) => p.stockLevel === 0).length,
    },
  ];

  const topShopsByStock = shops
    .map((shop: Shop) => ({
      name: shop.name,
      stockLevel: products
        .filter((product: Product) => product.shopId === shop.id)
        .reduce((sum: number, product: Product) => sum + product.stockLevel, 0),
    }))
    .sort(
      (a: { stockLevel: number }, b: { stockLevel: number }) =>
        b.stockLevel - a.stockLevel
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Shops</h2>
          <p className="text-3xl font-bold">{totalShops}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Value</h2>
          <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Stock</h2>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Stock Status Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Top 5 Shops by Stock Level
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topShopsByStock}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stockLevel" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
