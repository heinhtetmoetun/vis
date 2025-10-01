// /app/api/products/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/db";
import { Product } from "@/models";

export async function GET() {
  try {
    await dbConnect();
    const items = await Product.find().populate("category").sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const created = await Product.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
