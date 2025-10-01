import dbConnect from "@/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const category = new Category(data);
  await category.save();
  return NextResponse.json(category, { status: 201 });
}
