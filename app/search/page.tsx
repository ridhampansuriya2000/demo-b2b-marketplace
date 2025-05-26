"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, MapPin, DollarSign, Filter, X } from "lucide-react"
import { debounce } from "lodash"

interface Category {
  _id: string
  name: string
  slug: string
  attributeSchema: Record<
    string,
    {
      type: "string" | "number" | "boolean" | "array"
      options?: string[]
      label: string
    }
  >
}

interface Listing {
  _id: string
  title: string
  description: string
  price: number
  location: string
  categoryId: string
  category: Category
  attributes: Record<string, any>
  createdAt: string
}

interface Facet {
  _id: string
  count: number
}

interface SearchResponse {
  listings: Listing[]
  facets: Record<string, Facet[]>
  total: number
  page: number
  totalPages: number
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [categories, setCategories] = useState<Category[]>([])
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const filtersParam = searchParams.get("filters")
    if (filtersParam) {
      try {
        setFilters(JSON.parse(filtersParam))
      } catch (e) {
        console.error("Invalid filters in URL:", e)
      }
    }

    const pageParam = searchParams.get("page")
    if (pageParam) {
      setCurrentPage(Number.parseInt(pageParam))
    }
  }, [searchParams])

  useEffect(() => {
    if (initialLoad) {
      performSearch()
      setInitialLoad(false)
    }
  }, [initialLoad])

  useEffect(() => {
    if (!initialLoad) {
      performSearch()
    }
  }, [searchQuery, selectedCategory, filters, currentPage])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError("Failed to load categories")
    }
  }

  const performSearch = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)
      if (Object.keys(filters).length > 0) params.set("filters", JSON.stringify(filters))
      params.set("page", currentPage.toString())
      params.set("limit", "12")

      console.log("Search params:", params.toString())

      const response = await fetch(`/api/search?${params}`)
      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      setSearchResults(data)

      const newParams = new URLSearchParams()
      if (searchQuery) newParams.set("q", searchQuery)
      if (selectedCategory && selectedCategory !== "all") newParams.set("category", selectedCategory)
      if (Object.keys(filters).length > 0) newParams.set("filters", JSON.stringify(filters))
      if (currentPage > 1) newParams.set("page", currentPage.toString())

      const newUrl = `/search${newParams.toString() ? `?${newParams}` : ""}`
      window.history.replaceState({}, "", newUrl)
    } catch (err) {
      setError("Search failed. Please try again.")
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query)
      setCurrentPage(1)
    }, 300),
    [],
  )

  const handleSearchInput = (value: string) => {
    debouncedSearch(value)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setFilters({})
    setCurrentPage(1)
  }

  const handleFilterChange = (attribute: string, value: string, checked: boolean) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (!newFilters[attribute]) newFilters[attribute] = []

      if (checked) {
        newFilters[attribute] = [...newFilters[attribute], value]
      } else {
        newFilters[attribute] = newFilters[attribute].filter((v) => v !== value)
        if (newFilters[attribute].length === 0) {
          delete newFilters[attribute]
        }
      }

      return newFilters
    })
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setFilters({})
    setCurrentPage(1)
  }

  const selectedCategoryData = categories.find((cat) => cat.slug === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">B2B Marketplace Search</h1>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products, suppliers, or services..."
              className="pl-10"
              defaultValue={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchQuery || selectedCategory !== "all" || Object.keys(filters).length > 0) && (
            <Button variant="outline" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Refine Results
                </CardTitle>
                {Object.keys(filters).length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedCategoryData && searchResults?.facets ? (
                <div className="space-y-6">
                  <div className="text-sm text-muted-foreground mb-4">
                    Filter {selectedCategoryData.name.toLowerCase()} by specific attributes to narrow down your search
                    results.
                  </div>

                  {Object.entries(selectedCategoryData.attributeSchema).map(([key, schema]) => {
                    const facetData = searchResults.facets[key] || []
                    if (facetData.length === 0) return null

                    return (
                      <div key={key}>
                        <h4 className="font-medium mb-3">{schema.label}</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {facetData.map((facet) => (
                            <div key={facet._id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${key}-${facet._id}`}
                                checked={filters[key]?.includes(facet._id) || false}
                                onCheckedChange={(checked) => handleFilterChange(key, facet._id, checked as boolean)}
                              />
                              <label htmlFor={`${key}-${facet._id}`} className="text-sm flex-1 cursor-pointer">
                                {facet._id} ({facet.count})
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : selectedCategory !== "all" && selectedCategoryData ? (
                <div className="text-sm text-muted-foreground">
                  <p>Select "{selectedCategoryData.name}" category to see available filters for attributes like:</p>
                  <ul className="mt-2 space-y-1">
                    {Object.entries(selectedCategoryData.attributeSchema).map(([key, schema]) => (
                      <li key={key}>• {schema.label}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  <p className="mb-3">Select a specific category to see available filters.</p>
                  <p>Filters help you narrow down results by product attributes like:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Brand</li>
                    <li>• Size</li>
                    <li>• Color</li>
                    <li>• Price range</li>
                    <li>• Specifications</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {error && (
            <Alert className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {Object.keys(filters).length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium">Active filters:</span>
                {Object.entries(filters).map(([key, values]) =>
                  values.map((value) => (
                    <Badge key={`${key}-${value}`} variant="secondary">
                      {selectedCategoryData?.attributeSchema[key]?.label || key}: {value}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-2"
                        onClick={() => handleFilterChange(key, value, false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )),
                )}
              </div>
            </div>
          )}

          {loading ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full mb-4" />
                      <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {searchResults && searchResults.totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2 opacity-50">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" disabled>
                    1
                  </Button>
                  <Button variant="outline" disabled>
                    Next
                  </Button>
                </div>
              )}
            </div>
          ) : searchResults ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {searchResults.total} results found
                  {selectedCategory !== "all" && selectedCategoryData && <span> in {selectedCategoryData.name}</span>}
                  {searchQuery && <span> for "{searchQuery}"</span>}
                </p>
              </div>

              {searchResults.listings.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
                  <Button onClick={clearAllFilters}>Clear all filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {searchResults.listings.map((listing) => (
                    <Card key={listing._id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{listing.title}</CardTitle>
                        <Badge variant="outline">{listing.category.name}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{listing.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-medium">${listing.price.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{listing.location}</span>
                          </div>
                        </div>

                        {Object.keys(listing.attributes).length > 0 && (
                          <div className="space-y-1">
                            {Object.entries(listing.attributes)
                              .slice(0, 3)
                              .map(([key, value]) => (
                                <div key={key} className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">
                                    {selectedCategoryData?.attributeSchema[key]?.label || key}:
                                  </span>
                                  <span>{Array.isArray(value) ? value.join(", ") : value}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {searchResults.totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(5, searchResults.totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    disabled={currentPage === searchResults.totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Welcome to B2B Marketplace</h3>
              <p className="text-muted-foreground mb-4">Search for products or browse by category to get started</p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setSelectedCategory("televisions")}>Browse TVs</Button>
                <Button variant="outline" onClick={() => setSelectedCategory("running-shoes")}>
                  Browse Shoes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
