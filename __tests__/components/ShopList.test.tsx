import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ShopList from "@/components/ShopList";
import { useShops } from "@/lib/api";

// Mock the API hook
jest.mock("@/lib/api", () => ({
  useShops: jest.fn(),
}));

describe("ShopList", () => {
  const mockShops = [
    {
      id: "1",
      name: "Shop 1",
      description: "Description 1",
      logo: "https://example.com/logo1.png",
    },
    {
      id: "2",
      name: "Shop 2",
      description: "Description 2",
      logo: "https://example.com/logo2.png",
    },
  ];

  beforeEach(() => {
    (useShops as jest.Mock).mockReturnValue({
      shops: mockShops,
      isLoading: false,
      isError: false,
    });
  });

  it("renders the list of shops", async () => {
    render(<ShopList />);

    await waitFor(() => {
      expect(screen.getByText("Shop 1")).toBeInTheDocument();
      expect(screen.getByText("Shop 2")).toBeInTheDocument();
    });
  });

  it("displays loading state", async () => {
    (useShops as jest.Mock).mockReturnValue({
      shops: [],
      isLoading: true,
      isError: false,
    });

    render(<ShopList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state", async () => {
    (useShops as jest.Mock).mockReturnValue({
      shops: [],
      isLoading: false,
      isError: true,
    });

    render(<ShopList />);

    expect(screen.getByText("Error loading shops")).toBeInTheDocument();
  });
});
