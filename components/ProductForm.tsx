import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useShops } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be 100 characters or less"),
  price: z.number().min(0, "Price must be a positive number"),
  stockLevel: z
    .number()
    .int()
    .min(0, "Stock level must be a non-negative integer"),
  description: z
    .string()
    .min(1, "Product description is required")
    .max(500, "Product description must be 500 characters or less"),
  image: z
    .string()
    .url("Invalid URL for product image")
    .optional()
    .or(z.literal("")),
  shopId: z.string().min(1, "Shop is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const { shops, isLoading: isLoadingShops } = useShops();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      stockLevel: 0,
      description: "",
      image: "",
      shopId: "",
    },
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError("An error occurred while saving the product. Please try again.");
    }
  };

  if (isLoadingShops) return <div>Loading shops...</div>;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          placeholder="Enter price"
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="stockLevel">Stock Level</Label>
        <Input
          id="stockLevel"
          type="number"
          {...register("stockLevel", { valueAsNumber: true })}
          placeholder="Enter stock level"
        />
        {errors.stockLevel && (
          <p className="text-sm text-red-500">{errors.stockLevel.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Product Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter product description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Product Image URL</Label>
        <Input
          id="image"
          {...register("image")}
          placeholder="Enter image URL"
        />
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="shopId">Shop</Label>
        <Select
          onValueChange={(value) =>
            register("shopId").onChange({ target: { value } })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a shop" />
          </SelectTrigger>
          <SelectContent>
            {shops.map((shop) => (
              <SelectItem key={shop.id} value={shop.id}>
                {shop.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.shopId && (
          <p className="text-sm text-red-500">{errors.shopId.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Product"}
      </Button>
    </form>
  );
}
