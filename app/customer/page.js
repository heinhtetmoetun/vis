"use client";
import { useEffect, useState } from "react";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [editingId, setEditingId] = useState(null);

  async function fetchCustomers() {
    const res = await fetch("/api/customers");
    setCustomers(await res.json());
  }

  useEffect(() => { fetchCustomers(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      // Update
      await fetch(`/api/customers/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      // Create
      await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", email: "", phone: "", address: "" });
    fetchCustomers();
  }

  async function handleDelete(id) {
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    fetchCustomers();
  }

  function startEdit(c) {
    setEditingId(c._id);
    setForm({ name: c.name, email: c.email, phone: c.phone, address: c.address });
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input className="border p-2 w-full" placeholder="Name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
        <input className="border p-2 w-full" placeholder="Email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        <input className="border p-2 w-full" placeholder="Phone"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}/>
        <input className="border p-2 w-full" placeholder="Address"
          value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      <table className="w-full border">
        <thead><tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Phone</th>
          <th className="p-2 border">Actions</th>
        </tr></thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2">
                <button onClick={() => startEdit(c)} className="text-green-600 mr-2">Edit</button>
                <a href={`/customer/${c._id}`} className="text-blue-600 mr-2">View</a>
                <button onClick={() => handleDelete(c._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
