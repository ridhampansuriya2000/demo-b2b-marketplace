import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Listing } from "@/models/Listing"
import { Category } from "@/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q") || ""
    const category = searchParams.get("category") || ""
    const filtersParam = searchParams.get("filters") || "{}"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    console.log("Search params:", { q, category, filtersParam, page, limit })

    let filters: Record<string, string[]> = {}
    try {
      filters = JSON.parse(filtersParam)
    } catch (e) {
      console.error("Invalid filters JSON:", e)
    }

    const pipeline: any[] = []

    const matchStage: any = {}

    if (q) {
      matchStage.$text = { $search: q }
    }

    if (category && category !== "all" && category !== "") {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        matchStage.categoryId = categoryDoc._id
      }
    }

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        matchStage[`attributes.${key}`] = { $in: values }
      }
    })

    pipeline.push({ $match: matchStage })

    pipeline.push({
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    })

    pipeline.push({
      $unwind: "$category",
    })

    const facetStage: any = {
      results: [
        { $skip: (page - 1) * limit },
        { $limit: limit },
        { $sort: q ? { score: { $meta: "textScore" }, createdAt: -1 } : { createdAt: -1 } },
      ],
      total: [{ $count: "count" }],
    }

    if (category && category !== "all" && category !== "") {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc && categoryDoc.attributeSchema) {
        Object.keys(categoryDoc.attributeSchema).forEach((attributeKey) => {
          facetStage[`facet_${attributeKey}`] = [
            {
              $match: {
                [`attributes.${attributeKey}`]: { $exists: true, $ne: null },
              },
            },
            {
              $addFields: {
                attributeValue: {
                  $getField: { field: attributeKey, input: "$attributes" },
                },
              },
            },
            { $unwind: "$attributeValue" },
            {
              $group: {
                _id: "$attributeValue",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 20 },
          ]
        })
      }
    }

    pipeline.push({ $facet: facetStage })

    console.log("Executing aggregation pipeline...")
    const [result] = await Listing.aggregate(pipeline)

    const listings = result.results || []
    const total = result.total[0]?.count || 0
    const totalPages = Math.ceil(total / limit)

    const facets: Record<string, any[]> = {}
    Object.keys(result).forEach((key) => {
      if (key.startsWith("facet_")) {
        const attributeKey = key.replace("facet_", "")
        facets[attributeKey] = result[key] || []
      }
    })

    console.log(`Found ${listings.length} listings, ${total} total`)

    return NextResponse.json({
      listings,
      facets,
      total,
      page,
      totalPages,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
