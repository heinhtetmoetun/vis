'use client';
import { useRouter } from 'next/navigation';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stock App</h1>
      <p className="mb-6">Simple stock management system</p>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => router.push(`${BASE}/product`)}
        >
          Manage Products
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => router.push(`${BASE}/category`)}
        >
          Manage Categories
        </button>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={() => router.push(`${BASE}/customer`)}
        >
          Manage Customers
        </button>
      </div>
    </main>
  );
}
