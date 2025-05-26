import mongoose from "mongoose"

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
)

ListingSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 10,
      description: 5,
    },
  },
)

ListingSchema.index({ categoryId: 1 })

ListingSchema.index({ categoryId: 1, createdAt: -1 })

ListingSchema.index({ "attributes.$**": 1 })

export const Listing = mongoose.models.Listing || mongoose.model("Listing", ListingSchema)
