# B2B Marketplace

A full-stack B2B marketplace application built with Next.js, MongoDB, and TypeScript. Features advanced search, dynamic filtering, and category-specific attributes.

## Features

- **Advanced Search**: Full-text search across product titles and descriptions
- **Dynamic Filtering**: Category-specific filters that adapt based on product attributes
- **Faceted Search**: Real-time facet counts for available filter options
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Database Indexing**: Optimized MongoDB queries with proper indexing

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **UI Components**: shadcn/ui
- **Deployment**: Docker support included

## Prerequisites

- Node.js 18+ 
- MongoDB (local installation or Docker)
- npm or yarn

## Quick Start

### Option 1: Docker (Recommended)

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd b2b-marketplace
\`\`\`

2. Start with Docker Compose:
\`\`\`bash
docker-compose up -d
\`\`\`

3. Seed the database:
\`\`\`bash
docker-compose exec app npm run seed
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

### Option 2: Local Development

1. Clone and install dependencies:
\`\`\`bash
git clone <repository-url>
cd b2b-marketplace
npm install
\`\`\`

2. Start MongoDB locally:
\`\`\`bash
# Using MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
# Edit .env.local with your MongoDB connection string
\`\`\`

4. Seed the database:
\`\`\`bash
npm run seed
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## API Documentation

### GET /api/search

Search for products with filtering and faceting capabilities.

**Parameters:**
- \`q\` (string, optional): Search query for title and description
- \`category\` (string, optional): Category slug to filter by
- \`filters\` (string, optional): URL-encoded JSON object of attribute filters
- \`page\` (number, optional): Page number (default: 1)
- \`limit\` (number, optional): Results per page (default: 12)

**Example:**
\`\`\`
GET /api/search?q=samsung&category=televisions&filters={"brand":["Samsung"],"screenSize":["55\""]}&page=1&limit=12
\`\`\`

**Response:**
\`\`\`json
{
  "listings": [...],
  "facets": {
    "brand": [{"_id": "Samsung", "count": 5}],
    "screenSize": [{"_id": "55\"", "count": 3}]
  },
  "total": 25,
  "page": 1,
  "totalPages": 3
}
\`\`\`

### GET /api/categories

Get all available categories with their attribute schemas.

**Response:**
\`\`\`json
[
  {
    "_id": "...",
    "name": "Televisions",
    "slug": "televisions",
    "attributeSchema": {
      "brand": {
        "type": "string",
        "options": ["Samsung", "LG", "Sony"],
        "label": "Brand"
      }
    }
  }
]
\`\`\`

## Data Model

### Categories
- \`name\`: Display name
- \`slug\`: URL-friendly identifier
- \`attributeSchema\`: Flexible schema defining available attributes

### Listings
- \`title\`: Product title
- \`description\`: Product description
- \`price\`: Product price
- \`location\`: Supplier location
- \`categoryId\`: Reference to category
- \`attributes\`: Dynamic key-value attributes based on category schema

## Sample Data

The seeder script creates:
- **2 categories**: Televisions and Running Shoes
- **30+ listings**: 15 TVs and 15+ running shoes
- **Realistic attributes**: Brand, size, color, specifications, etc.

## Database Indexing

Optimized indexes for performance:
- Text index on title and description for search
- Category index for filtering
- Wildcard index on attributes for dynamic filtering
- Compound indexes for common query patterns

## Development

### Adding New Categories

1. Update the \`categories\` array in \`scripts/seed.ts\`
2. Define the \`attributeSchema\` with appropriate types and options
3. Add sample listings for the new category
4. Run the seeder: \`npm run seed\`

### Extending Attributes

The system supports flexible attributes:
- \`string\`: Text values with optional predefined options
- \`number\`: Numeric values
- \`boolean\`: True/false values
- \`array\`: Multiple values

## Testing

Run the application and test:

1. **Search functionality**: Try searching for "Samsung" or "Nike"
2. **Category filtering**: Select "Televisions" or "Running Shoes"
3. **Dynamic filters**: Notice how filters change based on category
4. **Facet counts**: Verify filter counts update correctly
5. **Pagination**: Test with different page sizes

## Production Deployment

### Environment Variables

\`\`\`bash
MONGODB_URI=mongodb://your-mongo-host:27017/b2b-marketplace
NODE_ENV=production
\`\`\`

### Docker Production

\`\`\`bash
docker build -t b2b-marketplace .
docker run -p 3000:3000 -e MONGODB_URI=your-connection-string b2b-marketplace
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## 🏗️ **Architecture Answers:**

### **1. Intent Extraction Strategy**
For query *"running shoes size 9 red under ₹2000 in Mumbai"*:

**Pipeline:**
- **NER Layer**: spaCy/NLTK for entity extraction (product, size, color, price, location)
- **Rule Engine**: Regex patterns for price ranges, sizes, locations
- **ML Classifier**: Fine-tuned BERT for product category classification
- **Fallback**: Keyword matching + fuzzy search when confidence < 0.7

### **2. Flexible Schema**
**Document Model (MongoDB)** with:
- **Categories**: Fixed schema with `attributeSchema` map
- **Listings**: Common fields + `attributes` object for dynamic properties
- **Indexing**: Wildcard index on `attributes.$**` for fast filtering
- **Migration**: New attributes added to schema without data migration

### **3. Dynamic Facet API**
\`\`\`typescript
GET /api/facets?category=televisions&filters={"brand":["Samsung"]}
Response: {
  facets: {
    "screenSize": [{"value": "55\"", "count": 12}],
    "resolution": [{"value": "4K", "count": 8}]
  }
}
\`\`\`

## 🚀 **Ready for Testing:**

1. **Visit `/admin`** → Seed database
2. **Visit `/search`** → Test all functionality
3. **Try category filtering** → Select TVs or Shoes
4. **Use attribute filters** → Brand, size, color, etc.
5. **Test pagination** → Navigate through pages

