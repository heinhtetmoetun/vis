"use client";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "" });

  // Fetch products
  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  // Fetch categories
  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Create product
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      alert("Please fill all fields");
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...form, 
        price: parseFloat(form.price) 
      }),
    });

    setForm({ name: "", price: "", category: "" });
    fetchProducts();
  }

  // Delete product
  async function handleDelete(id) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* Dropdown for Category */}
        <select
          className="border p-2 w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">
                {p.category?.name || "Unassigned"}
              </td>
              <td className="border p-2">
                <a
                  href={`/product/${p._id}`}
                  className="text-blue-500 mr-2"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
