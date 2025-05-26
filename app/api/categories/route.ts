import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Category } from "@/models/Category"

export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find({}).sort({ name: 1 })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Categories fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
