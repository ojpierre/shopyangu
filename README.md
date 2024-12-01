# ShopYangu Admin Panel

ShopYangu Admin Panel is a comprehensive management system for an e-commerce platform that allows administrators to manage shops, products, and orders, as well as track platform performance with real-time data visualizations. This project is built using [Next.js](https://nextjs.org/) and other modern technologies.

## Project Overview

As the admin of **ShopYangu**, a growing e-commerce platform, this admin panel allows efficient management of shops and products. Admins can create, update, and delete shops and products, view important shop details, and track performance metrics through a dashboard with advanced data visualizations.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Functional Requirements

### Core Features

#### 1. Shop Management

- **Create New Shop:** Admins can create new shops with details such as Shop Name, Shop Description, and Shop Logo.
- **Update Shop Details:** Admins can edit existing shop details.
- **Delete Shop:** Shops with active products cannot be deleted. A warning message is shown to remind the admin to reassign or remove the products first.
- **View Shop List:** A list of all shops with key details such as Shop Name, Shop Description, and Shop Logo. Admins can view, update, or delete shops directly from this list.

#### 2. Product Management

- **Create New Product:** Admins can create new products associated with any shop. Details include Product Name, Price, Stock Level, Description, and Image.
- **Update Product Details:** Admins can update product information such as Price, Stock Level, and Description.
- **Delete Product:** Admins can delete products from a shop.
- **View Product List:** The product list is sortable, searchable, and paginated, displaying details such as Product Name, Price, Stock Level, and Product Image.

#### 3. Search, Filter, and Pagination

- **Search and Filter:** Admins can search products by name and filter by criteria such as Price, Stock Level, or Shop.
- **Pagination:** Large product lists are paginated for easy browsing.

### Bonus Features (Dashboard)

#### 1. Overview Metrics

- **Total Number of Shops:** Displays the total number of shops currently active on the platform.
- **Total Number of Products:** Displays the total number of products listed across all shops.
- **Total Value of Products in Shops:** Calculated based on product prices and stock levels.
- **Total Stock Level:** Total number of items in stock across all shops combined.

#### 2. Product Stock Status

- **Stock Status Distribution:** A graph showing the distribution of products by their stock status. Categories include:
  - **In Stock:** Products with stock levels greater than 5.
  - **Out of Stock:** Products with 0 stock.
  - **Low Stock:** Products with stock levels between 1 and 5.
- **Top 5 Shops by Stock Level:** Displays the top 5 shops based on stock levels.

#### 3. Real-Time Data Updates

- The admin panel dynamically updates when changes are made, such as when a new product is added or an existing product's stock level is updated.

## UI/UX Requirements

- **Responsive Design:** Fully responsive design for both desktop and mobile devices.
- **Intuitive Interface:** Simple and intuitive to navigate with easy access to shops, products, and metrics.

## Tech Stack

- **Frontend Framework:** Next.js (React Framework)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** SWR
- **Charts and Analytics:** Recharts
- **Mocking API:** json-server
- **Authentication:** bcryptjs, jsonwebtoken

## Setup Instructions

1. **Clone the repository:**

git clone https://github.com/ojpierre/shopyangu

2. **Navigate to the project directory**
   cd shopyangu

3. **Install dependencies:**

npm install

# or

yarn install

# or

pnpm install

# or

bun install

4. **Run the development server:**

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
Open the application in your browser:
Visit http://localhost:3000 to view the admin panel.

**Directory Structure**
.
├── components/ # Reusable React components (buttons, forms, tables)
├── pages/ # Next.js pages (routes)
│ ├── api/ # API routes
│ ├── dashboard/ # Dashboard pages with metrics and charts
│ ├── products/ # Product management pages (create, update, delete)
│ └── shops/ # Shop management pages (create, update, delete)
├── public/ # Static assets (images, logos)
├── styles/ # Tailwind and global styles
├── lib/ # Utility functions and hooks (e.g., API fetching)
└── README.md # Project documentation

**API Integration**
json-server is used to simulate backend operations for CRUD (Create, Read, Update, Delete) actions for shops and products.

Dashboard Data: The dashboard fetches and displays platform-wide metrics like total number of shops, products, and stock levels.

**Admin Panel Logins**
Admin 1:

Email: admin@shopyangu.com
Password: admin123 (hashed with bcrypt)
Admin 2:

Email: test@shopyangu.com
Password: 1234 (hashed with bcrypt)
Deployment
The easiest way to deploy your Next.js app is with the Vercel Platform. To deploy:

Install the Vercel CLI:

npm install -g vercel
Link your project and deploy:

vercel
Check out Next.js deployment documentation for more details.
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch: git checkout -b feature-name.
Make your changes and commit: git commit -m "Add feature".
Push to your fork: git push origin feature-name.
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

### Key Updates:

- **Project Overview:** Added a brief description of ShopYangu and its purpose.
- **Admin Panel Logins:** Specified the login credentials for the admin panel.
- **Functional Requirements:** Detailed description of core and bonus features.
- **Tech Stack:** Clear specification of technologies used.
- **Setup Instructions:** How to clone, install dependencies, and run the development server.
