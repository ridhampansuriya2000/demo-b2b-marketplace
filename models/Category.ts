import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    attributeSchema: {
      type: Map,
      of: {
        type: {
          type: String,
          enum: ["string", "number", "boolean", "array"],
          required: true,
        },
        options: [String],
        label: {
          type: String,
          required: true,
        },
      },
      default: {},
    },
  },
  {
    timestamps: true,
  },
)

export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)
