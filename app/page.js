'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">Stock App</h1>
      <p className="mb-6">Simple stock management</p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.push('/product')}>
          Products
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => router.push('/category')}>
          Categories
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={() => router.push('/customer')}>
          Customers
        </button>
      </div>
    </main>
  );
}
