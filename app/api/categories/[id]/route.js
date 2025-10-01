import dbConnect from "@/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const category = await Category.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(category);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Category.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
