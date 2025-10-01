import dbConnect from "@/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const category = await Category.findById(params.id);
  return category
    ? NextResponse.json(category)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const category = await Category.findByIdAndUpdate(params.id, data, { new: true });
  return category
    ? NextResponse.json(category)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const category = await Category.findByIdAndDelete(params.id);
  return category
    ? NextResponse.json({ message: "Deleted" })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
