"use client";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  useEffect(() => { fetchCategories(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/categories/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "" });
    fetchCategories();
  }

  async function handleDelete(id) {
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  function startEdit(c) {
    setEditingId(c._id);
    setForm({ name: c.name });
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input className="border p-2 w-full" placeholder="Category Name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <ul>
        {categories.map((c) => (
          <li key={c._id} className="flex justify-between border-b p-2">
            <span>{c.name}</span>
            <div>
              <button onClick={() => startEdit(c)} className="text-green-600 mr-2">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
