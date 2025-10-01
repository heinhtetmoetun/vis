'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const router = useRouter();

  const load = async () => {
    const res = await fetch(`${API}/products`);
    setProducts(await res.json());

    const resCat = await fetch(`${API}/categories`);
    setCategories(await resCat.json());
  };

  useEffect(() => { load(); }, []);

  const addProduct = async () => {
    await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, category }),
    });
    setName('');
    setPrice('');
    setCategory('');
    load();
  };

  return (
    <div>
      <h1>Products</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <button onClick={addProduct}>Add Product</button>

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - {p.price}{' '}
            <button onClick={() => router.push(`${BASE}/product/${p._id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
