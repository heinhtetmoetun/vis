import dbConnect from "@/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const customer = await Customer.findById(params.id);
  return customer
    ? NextResponse.json(customer)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const customer = await Customer.findByIdAndUpdate(params.id, data, { new: true });
  return customer
    ? NextResponse.json(customer)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const customer = await Customer.findByIdAndDelete(params.id);
  return customer
    ? NextResponse.json({ message: "Deleted" })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
