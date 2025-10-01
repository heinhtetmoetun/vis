import dbConnect from "@/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const customer = await Customer.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(customer);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Customer.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
