import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "@/components/ProductList";
import { useProducts, deleteProduct } from "@/lib/api";

// Import screen, fireEvent, and waitFor from @testing-library/dom
import { screen, fireEvent, waitFor } from "@testing-library/dom";

jest.mock("@/lib/api", () => ({
  useProducts: jest.fn(),
  deleteProduct: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("ProductList", () => {
  const mockProducts = [
    {
      id: "1",
      name: "Product 1",
      price: 10.99,
      stockLevel: 100,
      shop: { name: "Shop 1" },
    },
    {
      id: "2",
      name: "Product 2",
      price: 20.99,
      stockLevel: 50,
      shop: { name: "Shop 2" },
    },
  ];

  beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      isError: false,
      mutate: jest.fn(),
    });
    (deleteProduct as jest.Mock).mockResolvedValue({});
  });

  it("renders the product list correctly", async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("$10.99")).toBeInTheDocument();
      expect(screen.getByText("$20.99")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("50")).toBeInTheDocument();
      expect(screen.getByText("Shop 1")).toBeInTheDocument();
      expect(screen.getByText("Shop 2")).toBeInTheDocument();
    });
  });

  it("allows searching for products", async () => {
    render(<ProductList />);

    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: "Product 1" } });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    });
  });

  it("allows sorting products", async () => {
    render(<ProductList />);

    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    await waitFor(() => {
      const productNames = screen.getAllByRole("cell", { name: /Product \d/ });
      expect(productNames[0]).toHaveTextContent("Product 1");
      expect(productNames[1]).toHaveTextContent("Product 2");
    });

    fireEvent.click(nameHeader);

    await waitFor(() => {
      const productNames = screen.getAllByRole("cell", { name: /Product \d/ });
      expect(productNames[0]).toHaveTextContent("Product 2");
      expect(productNames[1]).toHaveTextContent("Product 1");
    });
  });

  it("allows deleting a product", async () => {
    render(<ProductList />);

    const deleteButtons = await screen.findAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    const confirmButton = await screen.findByText("Delete", {
      selector: "button",
    });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledWith("1");
    });
  });

  it("displays loading state", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: true,
      isError: false,
    });

    render(<ProductList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: false,
      isError: true,
    });

    render(<ProductList />);

    expect(screen.getByText("Error loading products")).toBeInTheDocument();
  });
});
