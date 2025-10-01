"use client";
import { useEffect, useState } from "react";

export default function CustomerDetail({ params }) {
  const { id } = params;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`/api/customers/${id}`).then((res) => res.json()).then(setCustomer);
  }, [id]);

  if (!customer) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Detail</h1>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
    </main>
  );
}
