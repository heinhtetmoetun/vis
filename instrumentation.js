// /instrumentation.js
import connect from "@/db";

export async function register() {
  console.log("API Endpoint:", process.env.NEXT_PUBLIC_API_URL);
  console.log("Connecting to database...");
  await connect();
  console.log("✅ MongoDB connected in instrumentation");
}
