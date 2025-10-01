'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ProductDetail({ params }) {
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API}/products/${params.id}`)
      .then(res => res.json())
      .then(data => setForm({ name: data.name, price: data.price, category: data.category || '' }));

    fetch(`${API}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, [params.id]);

  const update = async () => {
    await fetch(`${API}/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push(`${BASE}/product`);
  };

  const remove = async () => {
    await fetch(`${API}/products/${params.id}`, { method: 'DELETE' });
    router.push(`${BASE}/product`);
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <button onClick={update}>Save</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
