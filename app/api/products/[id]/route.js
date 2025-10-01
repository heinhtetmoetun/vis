import dbConnect from "@/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, data, { new: true }).populate("category");
  return NextResponse.json(product);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
