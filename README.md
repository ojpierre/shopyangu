This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# ShopYangu Admin Panel

ShopYangu Admin Panel is a comprehensive management system for an e-commerce platform. It allows administrators to manage shops, products, and orders, view important metrics, and track platform performance over time.

## Features

1. User Authentication:

   - Secure login system for administrators

2. Shop Management:

   - Create new shops with details like Shop Name, Shop Description, and Shop Logo
   - Update existing shop details
   - Delete shops (with safeguards against deleting shops with active products)
   - View a list of all shops with key details

3. Product Management:

   - Create new products associated with shops
   - Update product details including Price, Stock Level, and Description
   - Delete products
   - View a sortable, searchable, and paginated list of all products

4. Order Management:

   - View a list of all orders
   - Update order statuses
   - View detailed information for individual orders

5. Advanced Analytics Dashboard:

   - Overview metrics (Total Shops, Total Products, Total Value, Total Stock)
   - Product Stock Status Distribution
   - Top 5 Shops by Stock Level
   - Sales over time chart
   - Top-selling products chart

6. Search, Filter, and Pagination:

   - Search products by name
   - Filter products by criteria such as Price, Stock Level, or Shop
   - Paginated lists for easy browsing of large datasets

7. Real-time Updates:
   - Dynamic updates when changes are made to shops, products, or orders

## Tech Stack

- Next.js (React framework)
- TypeScript
- Tailwind CSS (for styling)
- SWR (for data fetching and caching)
- Recharts (for data visualization)
- json-server (for mocking API)
- bcryptjs and jsonwebtoken (for authentication)

## Setup Instructions

1. Clone the repository:
