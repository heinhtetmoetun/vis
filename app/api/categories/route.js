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
  const body = await req.json();
  const category = await Category.create(body);
  return NextResponse.json(category);
}
