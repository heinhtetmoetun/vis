'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CustomerDetail({ params }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const router = useRouter();

  useEffect(() => {
    fetch(`${API}/customers/${params.id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [params.id]);

  const update = async () => {
    await fetch(`${API}/customers/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push(`${BASE}/customer`);
  };

  const remove = async () => {
    await fetch(`${API}/customers/${params.id}`, { method: 'DELETE' });
    router.push(`${BASE}/customer`);
  };

  return (
    <div>
      <h1>Edit Customer</h1>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
      <button onClick={update}>Save</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
