'use client';
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  async function addCategory() {
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchCategories();
  }

  async function deleteCategory(id) {
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  async function updateCategory(id) {
    const newName = prompt("Enter new name:");
    if (newName) {
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      fetchCategories();
    }
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl">Categories</h1>
      <input
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
      />
      <button className="ml-2 bg-blue-500 text-white px-4 py-2" onClick={addCategory}>
        Add
      </button>
      <ul className="mt-4 space-y-2">
        {categories.map((c) => (
          <li key={c._id} className="flex justify-between border p-2">
            {c.name}
            <div>
              <button onClick={() => updateCategory(c._id)} className="mr-2 text-yellow-500">Edit</button>
              <button onClick={() => deleteCategory(c._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
