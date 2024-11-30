import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "@/components/Dashboard";
import {
  useShops,
  useProducts,
  useSalesData,
  useTopSellingProducts,
} from "@/lib/api";

// Import screen from @testing-library/dom
import { screen } from "@testing-library/dom";

jest.mock("@/lib/api", () => ({
  useShops: jest.fn(),
  useProducts: jest.fn(),
  useSalesData: jest.fn(),
  useTopSellingProducts: jest.fn(),
}));

jest.mock("recharts", () => ({
  BarChart: () => <div data-testid="bar-chart" />,
  Bar: () => <div />,
  LineChart: () => <div data-testid="line-chart" />,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    (useShops as jest.Mock).mockReturnValue({
      shops: [
        { id: "1", name: "Shop 1" },
        { id: "2", name: "Shop 2" },
      ],
      isLoading: false,
    });
    (useProducts as jest.Mock).mockReturnValue({
      products: [
        { id: "1", name: "Product 1", price: 10, stockLevel: 100 },
        { id: "2", name: "Product 2", price: 20, stockLevel: 50 },
      ],
      isLoading: false,
    });
    (useSalesData as jest.Mock).mockReturnValue({
      salesData: [
        { date: "2023-01-01", sales: 1000 },
        { date: "2023-01-02", sales: 1500 },
      ],
      isLoading: false,
    });
    (useTopSellingProducts as jest.Mock).mockReturnValue({
      topSellingProducts: [
        { name: "Product 1", sales: 100 },
        { name: "Product 2", sales: 80 },
      ],
      isLoading: false,
    });
  });

  it("renders the dashboard with correct metrics and charts", () => {
    render(<Dashboard />);

    // Check metrics
    expect(screen.getByText("Total Shops")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Total Products")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Total Value")).toBeInTheDocument();
    expect(screen.getByText("$2000.00")).toBeInTheDocument();
    expect(screen.getByText("Total Stock")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();

    // Check chart titles
    expect(screen.getByText("Stock Status Distribution")).toBeInTheDocument();
    expect(screen.getByText("Sales Over Time")).toBeInTheDocument();
    expect(screen.getByText("Top Selling Products")).toBeInTheDocument();

    // Check charts are rendered
    expect(screen.getAllByTestId("bar-chart")).toHaveLength(2);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("displays loading state when data is being fetched", () => {
    (useShops as jest.Mock).mockReturnValue({ isLoading: true });
    (useProducts as jest.Mock).mockReturnValue({ isLoading: true });
    (useSalesData as jest.Mock).mockReturnValue({ isLoading: true });
    (useTopSellingProducts as jest.Mock).mockReturnValue({ isLoading: true });

    render(<Dashboard />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles error state when data fetching fails", () => {
    (useShops as jest.Mock).mockReturnValue({ isError: true });
    (useProducts as jest.Mock).mockReturnValue({ isError: true });
    (useSalesData as jest.Mock).mockReturnValue({ isError: true });
    (useTopSellingProducts as jest.Mock).mockReturnValue({ isError: true });

    render(<Dashboard />);

    expect(
      screen.getByText("Error loading dashboard data")
    ).toBeInTheDocument();
  });
});
