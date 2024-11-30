import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const shopSchema = z.object({
  name: z
    .string()
    .min(1, "Shop name is required")
    .max(100, "Shop name must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Shop description is required")
    .max(500, "Shop description must be 500 characters or less"),
  logo: z
    .string()
    .url("Invalid URL for shop logo")
    .optional()
    .or(z.literal("")),
});

type ShopFormData = z.infer<typeof shopSchema>;

interface ShopFormProps {
  initialData?: ShopFormData;
  onSubmit: (data: ShopFormData) => Promise<void>;
}

export function ShopForm({ initialData, onSubmit }: ShopFormProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      logo: "",
    },
  });

  const handleFormSubmit = async (data: ShopFormData) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError("An error occurred while saving the shop. Please try again.");
    }
  };

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
        <Label htmlFor="name">Shop Name</Label>
        <Input id="name" {...register("name")} placeholder="Enter shop name" />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Shop Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter shop description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Shop Logo URL (optional)</Label>
        <Input id="logo" {...register("logo")} placeholder="Enter logo URL" />
        {errors.logo && (
          <p className="text-sm text-red-500">{errors.logo.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Shop"}
      </Button>
    </form>
  );
}
