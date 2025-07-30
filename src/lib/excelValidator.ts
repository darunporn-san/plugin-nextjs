import * as XLSX from 'xlsx';

export interface ExcelValidationResult {
  isValid: boolean;
  error?: string;
  headers?: string[];
  data?: any[][];
}

export interface ExpectedHeaders {
  headers: string[];
  required: boolean;
}

/**
 * Validates Excel file structure and headers
 * @param file - The uploaded Excel file
 * @param expectedHeaders - Array of expected header names
 * @returns ExcelValidationResult with validation status
 */
export const validateExcelFile = async (
  file: File,
  expectedHeaders: ExpectedHeaders
): Promise<ExcelValidationResult> => {
  try {
    // Check file type
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      return {
        isValid: false,
        error: 'ไฟล์ต้องเป็น Excel (.xlsx หรือ .xls) เท่านั้น'
      };
    }

    // Read the Excel file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON to get headers and data
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    if (jsonData.length === 0) {
      return {
        isValid: false,
        error: 'ไฟล์ Excel ไม่มีข้อมูล'
      };
    }

    // Get headers from first row
    const headers = jsonData[0] as string[];
    
    // Check if we have exactly 5 columns
    if (headers.length !== 5) {
      return {
        isValid: false,
        error: `ไฟล์ต้องมี 5 คอลัมน์เท่านั้น (พบ ${headers.length} คอลัมน์)`,
        headers
      };
    }

    // Check if headers match expected headers
    if (expectedHeaders.required) {
      const missingHeaders = expectedHeaders.headers.filter(
        expected => !headers.some(header => 
          header?.toString().toLowerCase().trim() === expected.toLowerCase().trim()
        )
      );

      if (missingHeaders.length > 0) {
        return {
          isValid: false,
          error: `หัวตารางไม่ถูกต้อง: ${missingHeaders.join(', ')}`,
          headers
        };
      }
    }

    // Check if we have data rows
    if (jsonData.length < 2) {
      return {
        isValid: false,
        error: 'ไฟล์ต้องมีข้อมูลอย่างน้อย 1 แถว',
        headers
      };
    }

    return {
      isValid: true,
      headers,
      data: jsonData.slice(1) as any[][]
    };

  } catch (error) {
    return {
      isValid: false,
      error: `เกิดข้อผิดพลาดในการอ่านไฟล์: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

/**
 * Validates Excel file with specific 5-column structure
 * @param file - The uploaded Excel file
 * @param expectedHeaders - Array of exactly 5 expected header names
 * @returns ExcelValidationResult with validation status
 */
export const validateExcelFileWithHeaders = async (
  file: File,
  expectedHeaders: string[]
): Promise<ExcelValidationResult> => {
  if (expectedHeaders.length !== 5) {
    throw new Error('Expected headers must be exactly 5 columns');
  }

  return validateExcelFile(file, {
    headers: expectedHeaders,
    required: true
  });
};

/**
 * Example usage with specific headers
 */
export const validateProductExcelFile = async (file: File): Promise<ExcelValidationResult> => {
  const expectedHeaders = [
    'รหัสสินค้า',
    'ชื่อสินค้า', 
    'หมวดหมู่',
    'ราคา',
    'จำนวนคงเหลือ'
  ];

  return validateExcelFileWithHeaders(file, expectedHeaders);
}; 