import dbConnect from "@/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const customers = await Customer.find();
  return NextResponse.json(customers);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const customer = await Customer.create(body);
  return NextResponse.json(customer);
}
