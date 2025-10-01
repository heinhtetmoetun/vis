'use client';
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  async function addProduct() {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category: categoryId }),
    });
    setName(""); setPrice(""); setCategoryId("");
    fetchProducts();
  }

  async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  async function updateProduct(id) {
    const newName = prompt("Enter new name:");
    const newPrice = prompt("Enter new price:");
    if (newName && newPrice) {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, price: newPrice }),
      });
      fetchProducts();
    }
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl">Products</h1>
      <input
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
      />
      <input
        className="border p-2 mr-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <select
        className="border p-2 mr-2"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addProduct}>
        Add
      </button>

      <ul className="mt-4 space-y-2">
        {products.map((p) => (
          <li key={p._id} className="flex justify-between border p-2">
            {p.name} (${p.price}) — {p.category?.name}
            <div>
              <button onClick={() => updateProduct(p._id)} className="mr-2 text-yellow-500">Edit</button>
              <button onClick={() => deleteProduct(p._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
