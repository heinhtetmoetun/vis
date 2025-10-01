'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CategoryDetail({ params }) {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(`${API}/categories/${params.id}`)
      .then(res => res.json())
      .then(data => setName(data.name));
  }, [params.id]);

  const update = async () => {
    await fetch(`${API}/categories/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    router.push(`${BASE}/category`);
  };

  const remove = async () => {
    await fetch(`${API}/categories/${params.id}`, { method: 'DELETE' });
    router.push(`${BASE}/category`);
  };

  return (
    <div>
      <h1>Edit Category</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={update}>Save</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
