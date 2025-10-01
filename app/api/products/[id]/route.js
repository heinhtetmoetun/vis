// /app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/db";
import { Product } from "@/models";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const product = await Product.findById(params.id).populate("category");
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const data = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
    }).populate("category");
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
