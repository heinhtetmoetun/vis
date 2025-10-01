'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const router = useRouter();

  const load = async () => {
    const res = await fetch(`${API}/categories`);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => { load(); }, []);

  const addCategory = async () => {
    await fetch(`${API}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    load();
  };

  return (
    <div>
      <h1>Categories</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" />
      <button onClick={addCategory}>Add Category</button>
      <ul>
        {categories.map(c => (
          <li key={c._id}>
            {c.name}{' '}
            <button onClick={() => router.push(`${BASE}/category/${c._id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
