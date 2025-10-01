import dbConnect from "@/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const product = await Product.findById(params.id).populate("category");
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const product = await Product.findByIdAndDelete(params.id);
  return product
    ? NextResponse.json({ message: "Deleted" })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
