"use client"

import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import BaseInput from "@/components/plugin/BaseInput"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  level: number
  code: string
  name_en: string
  name_th: string
  commission_rate: number
  is_control_product: boolean
  categories?: Category[]
}

interface CategoryDropdownProps {
  categories: Category[]
  selectedCategory?: string
  onCategorySelect?: (categoryId: string) => void
  placeholder?: string
  className?: string
  language?: 'th' | 'en'
  required?: boolean
  label?: string
  tooltip?: string
  error?: string
  disabled?: boolean
}

// Utility: Find max level in nested categories
function findMaxLevel(cats: Category[]): number {
  let maxLevel = 0
  const traverse = (categories: Category[]) => {
    for (const category of categories) {
      if (category.level > maxLevel) maxLevel = category.level
      if (category.categories && category.categories.length > 0) {
        traverse(category.categories)
      }
    }
  }
  traverse(cats)
  return maxLevel
}

// Utility: Get categories for a specific level based on hovered path
function getCategoriesForLevel(categories: Category[], hoveredLevels: string[], level: number): Category[] {
  if (level === 0) return categories
  let currentCategories = categories
  for (let i = 0; i < level; i++) {
    const parentId = hoveredLevels[i]
    const parent = currentCategories.find(cat => cat.id === parentId)
    if (parent?.categories) {
      currentCategories = parent.categories
    } else {
      return []
    }
  }
  return currentCategories
}

export function CategoryDropdown({
  categories,
  selectedCategory,
  onCategorySelect,
  placeholder = "กรุณาเลือกหมวดหมู่สินค้า",
  className,
  language = 'th',
  required = false,
  label,
  tooltip,
  error,
  disabled
}: CategoryDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [hoveredLevels, setHoveredLevels] = React.useState<string[]>([])

  // Memo: Find max level only when categories change
  const maxLevelFromData = React.useMemo(() => findMaxLevel(categories), [categories])

  // Memo: Find selected category object
  const selectedCategoryData = React.useMemo(() => {
    function findCategory(cats: Category[], id: string): Category | undefined {
      for (const cat of cats) {
        if (cat.id === id) return cat
        if (cat.categories) {
          const found = findCategory(cat.categories, id)
          if (found) return found
        }
      }
      return undefined
    }
    return selectedCategory ? findCategory(categories, selectedCategory) : undefined
  }, [categories, selectedCategory])

  // Memo: Display value for input
  const displayValue = React.useMemo(() => {
    if (selectedCategoryData) {
      return language === 'th' ? selectedCategoryData.name_th : selectedCategoryData.name_en
    }
    return ""
  }, [selectedCategoryData, language])

  // Handle hover at any level
  const handleLevelHover = (level: number, categoryId: string) => {
    setHoveredLevels(prev => {
      const newHovered = [...prev]
      newHovered[level] = categoryId
      newHovered.splice(level + 1)
      return newHovered
    })
  }

  // Handle select
  const handleCategorySelect = (categoryId: string) => {
    onCategorySelect?.(categoryId)
    setOpen(false)
    setHoveredLevels([])
  }

  // Render columns for each level
  const columns = React.useMemo(() => {
    return Array.from({ length: maxLevelFromData }, (_, level) => {
      const levelCategories = getCategoriesForLevel(categories, hoveredLevels, level)
      const isLastLevel = level === maxLevelFromData - 1
      return (
        <div
          key={level}
          className={cn("w-1/3", !isLastLevel && "border-r border-gray-200")}
        >
          <div className="max-h-96 overflow-y-auto">
            {levelCategories.map(category => (
              <div
                key={category.id}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-blue-600 hover:text-white",
                  hoveredLevels[level] === category.id && "bg-blue-600 text-white"
                )}
                onMouseEnter={() => handleLevelHover(level, category.id)}
                onClick={() => handleCategorySelect(category.id)}
              >
                <span>{language === 'th' ? category.name_th : category.name_en}</span>
                {category.categories && category.categories.length > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    })
  }, [categories, hoveredLevels, maxLevelFromData, language])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <BaseInput
            placeholder={placeholder}
            value={displayValue}
            readOnly
            className={cn("cursor-pointer w-full", className)}
            required={required}
            label={label}
            tooltip={tooltip}
            error={error}
            disabled={disabled}
          />
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 translate-y-1/4 text-gray-500 pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[800px] p-0"
        align="start"
        sideOffset={4}
        onMouseLeave={() => setHoveredLevels([])}
      >
        <div className="flex">{columns}</div>
      </PopoverContent>
    </Popover>
  )
} 