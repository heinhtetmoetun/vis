'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const router = useRouter();

  const load = async () => {
    const res = await fetch(`${API}/customers`);
    setCustomers(await res.json());
  };

  useEffect(() => { load(); }, []);

  const addCustomer = async () => {
    await fetch(`${API}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', email: '', phone: '', address: '' });
    load();
  };

  return (
    <div>
      <h1>Customers</h1>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
      <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" />
      <button onClick={addCustomer}>Add Customer</button>

      <ul>
        {customers.map(c => (
          <li key={c._id}>
            {c.name} - {c.email}{' '}
            <button onClick={() => router.push(`${BASE}/customer/${c._id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
