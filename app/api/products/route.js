import dbConnect from "@/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const products = await Product.find().populate("category");
  return NextResponse.json(products);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const product = new Product(data);
  await product.save();
  return NextResponse.json(product, { status: 201 });
}
