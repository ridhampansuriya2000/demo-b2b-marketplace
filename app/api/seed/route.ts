import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Category } from "@/models/Category"
import { Listing } from "@/models/Listing"

const categories = [
  {
    name: "Televisions",
    slug: "televisions",
    attributeSchema: {
      brand: {
        type: "string",
        options: ["Samsung", "LG", "Sony", "TCL", "Hisense"],
        label: "Brand",
      },
      screenSize: {
        type: "string",
        options: ['32"', '43"', '50"', '55"', '65"', '75"', '85"'],
        label: "Screen Size",
      },
      resolution: {
        type: "string",
        options: ["HD", "Full HD", "4K", "8K"],
        label: "Resolution",
      },
      smartTV: {
        type: "string",
        options: ["Yes", "No"],
        label: "Smart TV",
      },
      displayType: {
        type: "string",
        options: ["LED", "OLED", "QLED", "LCD"],
        label: "Display Type",
      },
    },
  },
  {
    name: "Running Shoes",
    slug: "running-shoes",
    attributeSchema: {
      brand: {
        type: "string",
        options: ["Nike", "Adidas", "New Balance", "ASICS", "Brooks", "Saucony"],
        label: "Brand",
      },
      size: {
        type: "string",
        options: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        label: "Size",
      },
      color: {
        type: "string",
        options: ["Black", "White", "Red", "Blue", "Gray", "Green", "Multi"],
        label: "Color",
      },
      gender: {
        type: "string",
        options: ["Men", "Women", "Unisex"],
        label: "Gender",
      },
      type: {
        type: "string",
        options: ["Road Running", "Trail Running", "Cross Training", "Walking"],
        label: "Type",
      },
    },
  },
]

const televisionListings = [
  {
    title: 'Samsung 55" 4K Smart TV QN55Q60C',
    description: "Crystal clear 4K resolution with smart TV capabilities. Perfect for streaming and gaming.",
    price: 599,
    location: "New York, NY",
    attributes: {
      brand: "Samsung",
      screenSize: '55"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "QLED",
    },
  },
  {
    title: 'Samsung 65" QLED Smart TV QN65Q80C',
    description: "Premium QLED TV with quantum dot technology for vivid colors.",
    price: 1099,
    location: "San Jose, CA",
    attributes: {
      brand: "Samsung",
      screenSize: '65"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "QLED",
    },
  },
  {
    title: 'Samsung 32" HD Smart TV UN32M4500',
    description: "Compact smart TV perfect for bedrooms or small spaces.",
    price: 199,
    location: "Phoenix, AZ",
    attributes: {
      brand: "Samsung",
      screenSize: '32"',
      resolution: "HD",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Samsung 75" 8K QLED TV QN75Q900C',
    description: "Top-of-the-line 8K QLED TV with premium features.",
    price: 2499,
    location: "Charlotte, NC",
    attributes: {
      brand: "Samsung",
      screenSize: '75"',
      resolution: "8K",
      smartTV: "Yes",
      displayType: "QLED",
    },
  },
  {
    title: 'Samsung 43" 4K Smart TV UN43TU7000',
    description: "Mid-size 4K TV with Crystal UHD display technology.",
    price: 329,
    location: "Miami, FL",
    attributes: {
      brand: "Samsung",
      screenSize: '43"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Samsung 50" 4K Smart TV UN50TU8000',
    description: "Crystal 4K UHD TV with HDR and smart features.",
    price: 449,
    location: "Atlanta, GA",
    attributes: {
      brand: "Samsung",
      screenSize: '50"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Samsung 85" 4K QLED TV QN85Q70C',
    description: "Massive 85-inch QLED display for ultimate viewing experience.",
    price: 1899,
    location: "Las Vegas, NV",
    attributes: {
      brand: "Samsung",
      screenSize: '85"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "QLED",
    },
  },

  {
    title: 'LG 65" OLED Smart TV OLED65C3PUA',
    description: "Premium OLED display with perfect blacks and infinite contrast. Ideal for home theater.",
    price: 1299,
    location: "Los Angeles, CA",
    attributes: {
      brand: "LG",
      screenSize: '65"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "OLED",
    },
  },
  {
    title: 'LG 50" 4K LED TV 50UP7000PUA',
    description: "Mid-size 4K TV with vibrant colors and smart features.",
    price: 449,
    location: "Philadelphia, PA",
    attributes: {
      brand: "LG",
      screenSize: '50"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'LG 43" Full HD LED TV 43LM5700PUA',
    description: "Reliable LED TV with good picture quality and smart features.",
    price: 299,
    location: "Austin, TX",
    attributes: {
      brand: "LG",
      screenSize: '43"',
      resolution: "Full HD",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'LG 55" OLED Smart TV OLED55B3PUA',
    description: "OLED TV with self-lit pixels for perfect picture quality.",
    price: 999,
    location: "Seattle, WA",
    attributes: {
      brand: "LG",
      screenSize: '55"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "OLED",
    },
  },
  {
    title: 'LG 75" 4K LED TV 75UP7000PUA',
    description: "Large screen 4K TV with webOS smart platform.",
    price: 899,
    location: "Denver, CO",
    attributes: {
      brand: "LG",
      screenSize: '75"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'LG 32" HD Smart TV 32LM570BPUA',
    description: "Compact HD TV with smart features for smaller rooms.",
    price: 179,
    location: "Portland, OR",
    attributes: {
      brand: "LG",
      screenSize: '32"',
      resolution: "HD",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'LG 77" OLED Smart TV OLED77C3PUA',
    description: "Premium large OLED TV with cinema-quality picture.",
    price: 2199,
    location: "San Francisco, CA",
    attributes: {
      brand: "LG",
      screenSize: '75"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "OLED",
    },
  },

  {
    title: 'Sony 43" Full HD LED TV KDL43W660F',
    description: "Reliable LED TV with excellent picture quality and built-in apps.",
    price: 349,
    location: "Chicago, IL",
    attributes: {
      brand: "Sony",
      screenSize: '43"',
      resolution: "Full HD",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Sony 85" 8K Smart TV XR85Z9K',
    description: "Premium large screen TV with cutting-edge 8K resolution.",
    price: 2999,
    location: "San Antonio, TX",
    attributes: {
      brand: "Sony",
      screenSize: '85"',
      resolution: "8K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Sony 55" OLED Smart TV XR55A80K',
    description: "Premium OLED TV with exceptional picture quality and smart features.",
    price: 1199,
    location: "Jacksonville, FL",
    attributes: {
      brand: "Sony",
      screenSize: '55"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "OLED",
    },
  },
  {
    title: 'Sony 65" 4K LED TV XR65X90K',
    description: "4K LED TV with full array local dimming and Google TV.",
    price: 899,
    location: "Boston, MA",
    attributes: {
      brand: "Sony",
      screenSize: '65"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Sony 50" 4K Smart TV XR50X75K',
    description: "Mid-range 4K TV with Triluminos display technology.",
    price: 549,
    location: "Nashville, TN",
    attributes: {
      brand: "Sony",
      screenSize: '50"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Sony 75" 4K LED TV XR75X95K',
    description: "Large premium LED TV with mini LED backlighting.",
    price: 1699,
    location: "Detroit, MI",
    attributes: {
      brand: "Sony",
      screenSize: '75"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },

  {
    title: 'TCL 75" 4K Smart TV 75C735',
    description: "Large screen 4K TV with Roku built-in. Great value for money.",
    price: 799,
    location: "Houston, TX",
    attributes: {
      brand: "TCL",
      screenSize: '75"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'TCL 43" Full HD Smart TV 43S325',
    description: "Budget-friendly smart TV with good picture quality.",
    price: 249,
    location: "Dallas, TX",
    attributes: {
      brand: "TCL",
      screenSize: '43"',
      resolution: "Full HD",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'TCL 32" HD Smart TV 32S325',
    description: "Compact smart TV perfect for small rooms or secondary viewing.",
    price: 149,
    location: "Columbus, OH",
    attributes: {
      brand: "TCL",
      screenSize: '32"',
      resolution: "HD",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'TCL 55" 4K QLED TV 55C825',
    description: "QLED TV with quantum dot technology and mini LED backlighting.",
    price: 699,
    location: "Phoenix, AZ",
    attributes: {
      brand: "TCL",
      screenSize: '55"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "QLED",
    },
  },
  {
    title: 'TCL 65" 4K Smart TV 65C635',
    description: "Large 4K TV with Google TV platform and Dolby Vision.",
    price: 599,
    location: "San Diego, CA",
    attributes: {
      brand: "TCL",
      screenSize: '65"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'TCL 50" 4K Smart TV 50C635',
    description: "Mid-size 4K TV with HDR support and smart features.",
    price: 399,
    location: "Indianapolis, IN",
    attributes: {
      brand: "TCL",
      screenSize: '50"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },

  {
    title: 'Hisense 55" 4K QLED TV 55U6K',
    description: "Affordable QLED TV with excellent color reproduction.",
    price: 499,
    location: "San Diego, CA",
    attributes: {
      brand: "Hisense",
      screenSize: '55"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "QLED",
    },
  },
  {
    title: 'Hisense 65" 4K LED TV 65A6K',
    description: "Large screen 4K TV with good value and smart capabilities.",
    price: 549,
    location: "Fort Worth, TX",
    attributes: {
      brand: "Hisense",
      screenSize: '65"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Hisense 43" 4K Smart TV 43A6K',
    description: "Compact 4K TV with Android TV platform.",
    price: 299,
    location: "Memphis, TN",
    attributes: {
      brand: "Hisense",
      screenSize: '43"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Hisense 75" 4K QLED TV 75U8K',
    description: "Premium large QLED TV with mini LED technology.",
    price: 1299,
    location: "Milwaukee, WI",
    attributes: {
      brand: "Hisense",
      screenSize: '75"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "QLED",
    },
  },
  {
    title: 'Hisense 50" 4K Smart TV 50A6K',
    description: "Mid-range 4K TV with Dolby Vision HDR support.",
    price: 379,
    location: "Kansas City, MO",
    attributes: {
      brand: "Hisense",
      screenSize: '50"',
      resolution: "4K",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
  {
    title: 'Hisense 32" HD Smart TV 32A4K',
    description: "Budget-friendly HD TV with basic smart features.",
    price: 159,
    location: "Louisville, KY",
    attributes: {
      brand: "Hisense",
      screenSize: '32"',
      resolution: "HD",
      smartTV: "Yes",
      displayType: "LED",
    },
  },
]

const runningShoeListings = [
  {
    title: "Nike Air Zoom Pegasus 40",
    description: "Versatile running shoe with responsive cushioning for daily training.",
    price: 130,
    location: "Seattle, WA",
    attributes: {
      brand: "Nike",
      size: "9",
      color: "Black",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "Nike Air Zoom Terra Kiger 8",
    description: "Trail running shoe with aggressive traction for off-road adventures.",
    price: 140,
    location: "Salt Lake City, UT",
    attributes: {
      brand: "Nike",
      size: "9.5",
      color: "Green",
      gender: "Men",
      type: "Trail Running",
    },
  },
  {
    title: "Nike Metcon 8",
    description: "Cross-training shoe built for high-intensity workouts.",
    price: 130,
    location: "Tucson, AZ",
    attributes: {
      brand: "Nike",
      size: "9",
      color: "Red",
      gender: "Unisex",
      type: "Cross Training",
    },
  },
  {
    title: "Nike Air Max 270",
    description: "Lifestyle running shoe with maximum Air cushioning.",
    price: 150,
    location: "Orlando, FL",
    attributes: {
      brand: "Nike",
      size: "10",
      color: "White",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "Nike React Infinity Run Flyknit 3",
    description: "Injury-reducing running shoe with React foam technology.",
    price: 160,
    location: "Tampa, FL",
    attributes: {
      brand: "Nike",
      size: "8.5",
      color: "Blue",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "Nike Free RN 5.0",
    description: "Minimalist running shoe for natural foot movement.",
    price: 100,
    location: "Richmond, VA",
    attributes: {
      brand: "Nike",
      size: "7.5",
      color: "Gray",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "Nike Air Zoom Alphafly NEXT%",
    description: "Elite racing shoe with carbon fiber plate technology.",
    price: 275,
    location: "Eugene, OR",
    attributes: {
      brand: "Nike",
      size: "11",
      color: "Multi",
      gender: "Men",
      type: "Road Running",
    },
  },

  {
    title: "Adidas Ultraboost 22",
    description: "Premium running shoe with Boost midsole for maximum energy return.",
    price: 180,
    location: "Denver, CO",
    attributes: {
      brand: "Adidas",
      size: "8.5",
      color: "White",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "Adidas Terrex Agravic Ultra",
    description: "Ultra-distance trail running shoe with superior grip.",
    price: 170,
    location: "Boulder, CO",
    attributes: {
      brand: "Adidas",
      size: "7",
      color: "Multi",
      gender: "Women",
      type: "Trail Running",
    },
  },
  {
    title: "Adidas Alphaboost V1",
    description: "Comfortable running shoe with Boost cushioning technology.",
    price: 100,
    location: "Fresno, CA",
    attributes: {
      brand: "Adidas",
      size: "8",
      color: "White",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "Adidas Supernova+",
    description: "Daily training shoe with Dreamstrike+ cushioning.",
    price: 120,
    location: "Minneapolis, MN",
    attributes: {
      brand: "Adidas",
      size: "10.5",
      color: "Black",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "Adidas Solar Glide 5",
    description: "Supportive running shoe with Continental rubber outsole.",
    price: 130,
    location: "Cleveland, OH",
    attributes: {
      brand: "Adidas",
      size: "9",
      color: "Blue",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "Adidas Adizero Boston 11",
    description: "Lightweight racing shoe for tempo runs and races.",
    price: 140,
    location: "Pittsburgh, PA",
    attributes: {
      brand: "Adidas",
      size: "8",
      color: "Red",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "Adidas Terrex Swift R3",
    description: "Versatile hiking shoe with Continental rubber grip.",
    price: 110,
    location: "Bozeman, MT",
    attributes: {
      brand: "Adidas",
      size: "11.5",
      color: "Gray",
      gender: "Men",
      type: "Trail Running",
    },
  },

  {
    title: "New Balance Fresh Foam X 1080v12",
    description: "Plush cushioning for long-distance comfort and performance.",
    price: 150,
    location: "Boston, MA",
    attributes: {
      brand: "New Balance",
      size: "10",
      color: "Blue",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "New Balance FuelCell Rebel v3",
    description: "Lightweight racing shoe with propulsive FuelCell foam.",
    price: 130,
    location: "Milwaukee, WI",
    attributes: {
      brand: "New Balance",
      size: "10.5",
      color: "White",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "New Balance 990v5",
    description: "Classic American-made running shoe with premium materials.",
    price: 185,
    location: "Sacramento, CA",
    attributes: {
      brand: "New Balance",
      size: "11.5",
      color: "Gray",
      gender: "Men",
      type: "Walking",
    },
  },
  {
    title: "New Balance Fresh Foam X More v4",
    description: "Maximum cushioning shoe for ultra-distance running.",
    price: 165,
    location: "Hartford, CT",
    attributes: {
      brand: "New Balance",
      size: "7.5",
      color: "Black",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "New Balance FuelCell TC",
    description: "Racing shoe with carbon fiber plate for speed.",
    price: 200,
    location: "Providence, RI",
    attributes: {
      brand: "New Balance",
      size: "9.5",
      color: "Multi",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "New Balance Hierro v7",
    description: "Trail running shoe with Fresh Foam X cushioning.",
    price: 135,
    location: "Burlington, VT",
    attributes: {
      brand: "New Balance",
      size: "8.5",
      color: "Green",
      gender: "Women",
      type: "Trail Running",
    },
  },

  {
    title: "ASICS Gel-Nimbus 25",
    description: "Maximum cushioning running shoe for neutral runners.",
    price: 160,
    location: "Portland, OR",
    attributes: {
      brand: "ASICS",
      size: "7.5",
      color: "Gray",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "ASICS Gel-Kayano 29",
    description: "Stability running shoe with excellent support for overpronators.",
    price: 160,
    location: "Las Vegas, NV",
    attributes: {
      brand: "ASICS",
      size: "8.5",
      color: "Blue",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "ASICS Gel-Cumulus 24",
    description: "Versatile daily trainer with GEL cushioning technology.",
    price: 130,
    location: "Reno, NV",
    attributes: {
      brand: "ASICS",
      size: "10",
      color: "Black",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "ASICS MetaSpeed Sky+",
    description: "Elite racing shoe with carbon plate for marathon performance.",
    price: 250,
    location: "San Jose, CA",
    attributes: {
      brand: "ASICS",
      size: "9",
      color: "White",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "ASICS Gel-Venture 9",
    description: "Trail running shoe with rugged outsole for varied terrain.",
    price: 70,
    location: "Spokane, WA",
    attributes: {
      brand: "ASICS",
      size: "11",
      color: "Gray",
      gender: "Men",
      type: "Trail Running",
    },
  },

  {
    title: "Brooks Ghost 15",
    description: "Smooth and balanced running shoe for everyday training.",
    price: 140,
    location: "Nashville, TN",
    attributes: {
      brand: "Brooks",
      size: "11",
      color: "Black",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "Brooks Adrenaline GTS 23",
    description: "Trusted stability shoe with smooth heel-to-toe transition.",
    price: 140,
    location: "Oklahoma City, OK",
    attributes: {
      brand: "Brooks",
      size: "12",
      color: "Gray",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "Brooks Glycerin 20",
    description: "Plush cushioning shoe for maximum comfort on long runs.",
    price: 150,
    location: "Little Rock, AR",
    attributes: {
      brand: "Brooks",
      size: "8",
      color: "Blue",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "Brooks Cascadia 16",
    description: "Trail running shoe with pivot post system for stability.",
    price: 140,
    location: "Jackson, WY",
    attributes: {
      brand: "Brooks",
      size: "9.5",
      color: "Green",
      gender: "Men",
      type: "Trail Running",
    },
  },

  {
    title: "Saucony Kinvara 14",
    description: "Lightweight and responsive shoe for faster training runs.",
    price: 110,
    location: "Memphis, TN",
    attributes: {
      brand: "Saucony",
      size: "8",
      color: "Red",
      gender: "Women",
      type: "Road Running",
    },
  },
  {
    title: "Saucony Peregrine 13",
    description: "Versatile trail running shoe for varied terrain.",
    price: 120,
    location: "Albuquerque, NM",
    attributes: {
      brand: "Saucony",
      size: "7.5",
      color: "Black",
      gender: "Women",
      type: "Trail Running",
    },
  },
  {
    title: "Saucony Triumph 20",
    description: "Maximum cushioning shoe with PWRRUN+ foam technology.",
    price: 150,
    location: "Charleston, SC",
    attributes: {
      brand: "Saucony",
      size: "10.5",
      color: "White",
      gender: "Men",
      type: "Road Running",
    },
  },
  {
    title: "Saucony Endorphin Speed 3",
    description: "Racing shoe with nylon plate for propulsive speed.",
    price: 170,
    location: "Lexington, KY",
    attributes: {
      brand: "Saucony",
      size: "9",
      color: "Multi",
      gender: "Men",
      type: "Road Running",
    },
  },
]

export async function POST() {
  try {
    await connectDB()

    const existingCategories = await Category.countDocuments()
    if (existingCategories > 0) {
      return NextResponse.json({ message: "Database already seeded", skipped: true })
    }

    await Category.deleteMany({})
    await Listing.deleteMany({})

    console.log("Cleared existing data")

    const insertedCategories = await Category.insertMany(categories)
    console.log("Inserted categories:", insertedCategories.length)

    const tvCategory = insertedCategories.find((cat) => cat.slug === "televisions")
    const shoeCategory = insertedCategories.find((cat) => cat.slug === "running-shoes")

    if (!tvCategory || !shoeCategory) {
      throw new Error("Failed to create categories")
    }

    const tvListingsWithCategory = televisionListings.map((listing) => ({
      ...listing,
      categoryId: tvCategory._id,
    }))

    const shoeListingsWithCategory = runningShoeListings.map((listing) => ({
      ...listing,
      categoryId: shoeCategory._id,
    }))

    const allListings = [...tvListingsWithCategory, ...shoeListingsWithCategory]
    const insertedListings = await Listing.insertMany(allListings)
    console.log("Inserted listings:", insertedListings.length)

    return NextResponse.json({
      message: "Database seeded successfully!",
      categories: insertedCategories.length,
      listings: insertedListings.length,
    })
  } catch (error) {
    console.error("Seeding error:", error)
    return NextResponse.json(
      { error: "Seeding failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
