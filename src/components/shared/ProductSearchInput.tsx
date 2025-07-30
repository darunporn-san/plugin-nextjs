"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  category?: string
  price?: number
}

interface ProductSearchInputProps {
  products?: Product[]
  onSearch?: (query: string) => void
  onProductSelect?: (product: Product) => void
  placeholder?: string
  className?: string
}

export function ProductSearchInput({
  products = [],
  onSearch,
  onProductSelect,
  placeholder = "กรุณากรอกชื่อสินค้า",
  className
}: ProductSearchInputProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
      setOpen(true)
    } else {
      setFilteredProducts([])
      setOpen(false)
    }
  }, [searchQuery, products])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch?.(value)
  }

  const handleProductSelect = (product: Product) => {
    onProductSelect?.(product)
    setSearchQuery(product.name)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn("pl-10", className)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-0" 
        align="start"
        sideOffset={4}
      >
        <div className="p-3 font-medium text-sm text-gray-700 border-b border-gray-200">
          ผลการค้นหา
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                onClick={() => handleProductSelect(product)}
              >
                <div className="font-medium">{product.name}</div>
                {product.category && (
                  <div className="text-xs text-gray-500 mt-1">{product.category}</div>
                )}
                {product.price && (
                  <div className="text-xs text-green-600 mt-1">฿{product.price.toLocaleString()}</div>
                )}
              </div>
            ))
          ) : searchQuery.trim() ? (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">
              ไม่พบสินค้าที่ค้นหา
            </div>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  )
} 