import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ShoppingCart, Users, TrendingUp, Database } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">B2B Marketplace</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with suppliers and find the products your business needs. Search through thousands of listings from
            verified suppliers worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Search className="mr-2 h-5 w-5" />
                Start Searching
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue-500 hover:bg-white hover:text-blue-700"
              >
                <Database className="mr-2 h-5 w-5" />
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Marketplace?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <ShoppingCart className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Vast Product Catalog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse thousands of products across multiple categories with detailed specifications and competitive
                  pricing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Verified Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with trusted suppliers who have been verified for quality and reliability in their respective
                  industries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Smart Search & Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find exactly what you need with our advanced search and filtering system that adapts to each product
                  category.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/search?category=televisions">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-xl">Televisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Find the latest TVs from top brands with various screen sizes, resolutions, and smart features.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/search?category=running-shoes">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-xl">Running Shoes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Discover running shoes for every type of runner, from casual joggers to professional athletes.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Supplier?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust our marketplace to find quality products and reliable suppliers.
          </p>
          <Link href="/search">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Search className="mr-2 h-5 w-5" />
              Explore Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
