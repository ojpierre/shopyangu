import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductForm from "@/components/ProductForm";
import { useShops } from "@/lib/api";

// Import screen, fireEvent, and waitFor from @testing-library/dom
import { screen, fireEvent, waitFor } from "@testing-library/dom";

jest.mock("@/lib/api", () => ({
  useShops: jest.fn(),
}));

describe("ProductForm", () => {
  const mockOnSubmit = jest.fn();
  const mockShops = [
    { id: "1", name: "Shop 1" },
    { id: "2", name: "Shop 2" },
  ];

  beforeEach(() => {
    mockOnSubmit.mockClear();
    (useShops as jest.Mock).mockReturnValue({
      shops: mockShops,
      isLoading: false,
      isError: false,
    });
  });

  it("renders the form fields correctly", () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stock level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product image url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/shop/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save product/i })
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "10.99" },
    });
    fireEvent.change(screen.getByLabelText(/stock level/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/product description/i), {
      target: { value: "A test product description" },
    });
    fireEvent.change(screen.getByLabelText(/product image url/i), {
      target: { value: "https://example.com/image.png" },
    });
    fireEvent.change(screen.getByLabelText(/shop/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save product/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: "Test Product",
        price: 10.99,
        stockLevel: 100,
        description: "A test product description",
        image: "https://example.com/image.png",
        shopId: "1",
      });
    });
  });

  it("displays validation errors for invalid data", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /save product/i }));

    await waitFor(() => {
      expect(screen.getByText(/product name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/price must be a positive number/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/stock level must be a non-negative integer/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/product description is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/invalid url for product image/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/shop is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("populates form fields with initial data", () => {
    const initialData = {
      name: "Existing Product",
      price: 15.99,
      stockLevel: 50,
      description: "An existing product description",
      image: "https://example.com/existing-image.png",
      shopId: "2",
    };

    render(<ProductForm onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByLabelText(/product name/i)).toHaveValue(
      "Existing Product"
    );
    expect(screen.getByLabelText(/price/i)).toHaveValue("15.99");
    expect(screen.getByLabelText(/stock level/i)).toHaveValue("50");
    expect(screen.getByLabelText(/product description/i)).toHaveValue(
      "An existing product description"
    );
    expect(screen.getByLabelText(/product image url/i)).toHaveValue(
      "https://example.com/existing-image.png"
    );
    expect(screen.getByLabelText(/shop/i)).toHaveValue("2");
  });
});
