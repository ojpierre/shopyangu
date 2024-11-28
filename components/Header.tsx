import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shops" className="text-gray-800 hover:text-gray-600">
              Shops
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-gray-800 hover:text-gray-600"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-gray-800 hover:text-gray-600"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
