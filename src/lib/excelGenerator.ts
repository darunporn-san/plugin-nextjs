import * as XLSX from 'xlsx';

export interface ProductData {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

/**
 * Generate sample Excel file with correct 5-column structure
 */
export const generateSampleExcelFile = (): void => {
  // Sample data with correct headers
  const headers = ['รหัสสินค้า', 'ชื่อสินค้า', 'หมวดหมู่', 'ราคา', 'จำนวนคงเหลือ'];
  
  const sampleData = [
    ['P001', 'Wireless Headphones', 'Electronics', 59.99, 50],
    ['P002', 'Yoga Mat', 'Sports & Fitness', 25.00, 30],
    ['P003', 'Coffee Maker', 'Home Appliances', 80.00, 15],
    ['P004', 'Running Shoes', 'Sportswear', 70.00, 25],
    ['P005', 'Smartwatch', 'Electronics', 120.00, 20],
  ];

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  // Generate file and download
  const fileName = 'sample_products.xlsx';
  XLSX.writeFile(workbook, fileName);
};

/**
 * Generate Excel file from product data array
 */
export const generateExcelFromData = (products: ProductData[], fileName: string = 'products.xlsx'): void => {
  const headers = ['รหัสสินค้า', 'ชื่อสินค้า', 'หมวดหมู่', 'ราคา', 'จำนวนคงเหลือ'];
  
  const data = products.map(product => [
    product.id,
    product.name,
    product.category,
    product.price,
    product.stock
  ]);

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  // Generate file and download
  XLSX.writeFile(workbook, fileName);
};

/**
 * Create Excel template with headers only
 */
export const generateExcelTemplate = (fileName: string = 'product_template.xlsx'): void => {
  const headers = ['รหัสสินค้า', 'ชื่อสินค้า', 'หมวดหมู่', 'ราคา', 'จำนวนคงเหลือ'];
  
  // Create workbook and worksheet with headers only
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  // Generate file and download
  XLSX.writeFile(workbook, fileName);
}; 