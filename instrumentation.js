import connect from "@/db";

export async function register() {
  console.log("API Endpoint:", process.env.NEXT_PUBLIC_API_URL);
  console.log("Connecting to database...");

  try {
    await connect();
    console.log("✅ MongoDB connected in instrumentation");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}
