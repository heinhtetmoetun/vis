// /app/api/categories/[id]/route.js
import dbConnect from "@/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const data = await req.json();
    const category = await Category.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(category);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    await Category.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
