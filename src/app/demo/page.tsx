"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { CategoryDropdown } from "@/components/shared/CategoryDropdown"
import { ProductSearchInput } from "@/components/shared/ProductSearchInput"
import { categories } from "@/lib/data"
import { productData, type Product } from "@/lib/categoryData"

interface FormData {
  category: string
  product: string
}

export default function DemoPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const form = useForm<FormData>({
    defaultValues: {
      category: "",
      product: ""
    }
  })

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    form.setValue("category", categoryId)
    console.log("Selected category:", categoryId)
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    form.setValue("product", product.name)
    console.log("Selected product:", product)
  }

  const handleSearch = (query: string) => {
    console.log("Search query:", query)
  }

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            ตัวอย่างการใช้งาน CategoryDropdown (Multi-Column Dropdown)
          </h1>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Category Dropdown */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                หมวดหมู่สินค้า (Multi-Column Dropdown)
              </h2>
              <CategoryDropdown
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                placeholder="กรุณาเลือกหมวดหมู่สินค้า"
                className="w-full"
                language="th"
              />
              {selectedCategory && (
                <p className="text-sm text-gray-600 mt-2">
                  หมวดหมู่ที่เลือก: {selectedCategory}
                </p>
              )}
            </div>

            {/* Product Search */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                ค้นหาจากชื่อสินค้า
              </h2>
              <ProductSearchInput
                products={productData}
                onSearch={handleSearch}
                onProductSelect={handleProductSelect}
                placeholder="กรุณากรอกชื่อสินค้า"
                className="w-full"
              />
              {selectedProduct && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    สินค้าที่เลือก: {selectedProduct.name}
                  </p>
                  {selectedProduct.category && (
                    <p className="text-xs text-gray-500">
                      หมวดหมู่: {selectedProduct.category}
                    </p>
                  )}
                  {selectedProduct.price && (
                    <p className="text-xs text-green-600">
                      ราคา: ฿{selectedProduct.price.toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                ส่งข้อมูล
              </button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">วิธีการใช้งาน Multi-Column Dropdown:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• คลิกที่ input field เพื่อเปิด multi-column dropdown</li>
              <li>• คอลัมน์ซ้าย: แสดงหมวดหมู่หลักทั้งหมด</li>
              <li>• Hover ไปที่หมวดหมู่เพื่อดู subcategories ในคอลัมน์กลาง</li>
              <li>• Hover ไปที่ subcategory เพื่อดูหมวดหมู่เพิ่มเติมในคอลัมน์ขวา</li>
              <li>• คลิกที่หมวดหมู่ใดก็ได้เพื่อเลือก</li>
              <li>• Input field เป็น read-only เพื่อป้องกันการพิมพ์</li>
              <li>• รองรับ placeholder และ required</li>
            </ul>
          </div>

          {/* Form Values Display */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">ค่าที่เลือก:</h3>
            <pre className="text-sm text-gray-600 bg-white p-3 rounded border">
              {JSON.stringify(form.watch(), null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 