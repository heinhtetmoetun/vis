'use client';
import { useEffect, useState } from "react";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => { fetchCustomers(); }, []);

  async function fetchCustomers() {
    const res = await fetch("/api/customers");
    setCustomers(await res.json());
  }

  async function addCustomer() {
    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName(""); setEmail("");
    fetchCustomers();
  }

  async function deleteCustomer(id) {
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    fetchCustomers();
  }

  async function updateCustomer(id) {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");
    if (newName && newEmail) {
      await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });
      fetchCustomers();
    }
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl">Customers</h1>
      <input
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        className="border p-2 mr-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addCustomer}>
        Add
      </button>

      <ul className="mt-4 space-y-2">
        {customers.map((c) => (
          <li key={c._id} className="flex justify-between border p-2">
            {c.name} ({c.email})
            <div>
              <button onClick={() => updateCustomer(c._id)} className="mr-2 text-yellow-500">Edit</button>
              <button onClick={() => deleteCustomer(c._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
