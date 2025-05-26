import { connectDB } from "../lib/mongodb"
import { Category } from "../models/Category"
import { Listing } from "../models/Listing"

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
    title: 'Samsung 55" 4K Smart TV',
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
    title: 'LG 65" OLED Smart TV',
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
    title: 'Sony 43" Full HD LED TV',
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
    title: 'TCL 75" 4K Smart TV',
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
    title: 'Samsung 32" HD Smart TV',
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
    title: 'LG 50" 4K LED TV',
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
    title: 'Sony 85" 8K Smart TV',
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
    title: 'Hisense 55" 4K QLED TV',
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
    title: 'TCL 43" Full HD Smart TV',
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
    title: 'Samsung 65" 4K QLED TV',
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
    title: 'LG 43" Full HD LED TV',
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
    title: 'Sony 55" OLED Smart TV',
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
    title: 'Hisense 65" 4K LED TV',
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
    title: 'TCL 32" HD Smart TV',
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
    title: 'Samsung 75" 8K QLED TV',
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
]

async function seedDatabase() {
  try {
    await connectDB()

    await Category.deleteMany({})
    await Listing.deleteMany({})

    console.log("Cleared existing data")

    const insertedCategories = await Category.insertMany(categories)
    console.log("Inserted categories:", insertedCategories.length)

    const tvCategory = insertedCategories.find((cat) => cat.slug === "televisions")
    const shoeCategory = insertedCategories.find((cat) => cat.slug === "running-shoes")

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

    console.log("Database seeded successfully!")
    console.log(`Total categories: ${insertedCategories.length}`)
    console.log(`Total listings: ${insertedListings.length}`)
  } catch (error) {
    console.error("Seeding error:", error)
  } finally {
    process.exit(0)
  }
}

seedDatabase()
