"use client";

import InputText from "@/components/shared/Input-Text";
import { DateRangePicker } from "@/components/shared/Date-Range-Picker";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TabComponent from "@/components/shared/Tab-Component";
import DataTable from "@/components/shared/Data-Table";
import { CategoryDropdown } from "@/components/shared/CategoryDropdown";
import { categories } from "@/lib/data";
import { BaseInputFile } from "@/components/plugin";
import { generateSampleExcelFile, generateExcelTemplate } from "@/lib/excelGenerator";
interface FormData {
  text: string;
  theme: string;
  dateRange: string;
  allChannels: boolean;
  channels: string[];
  category: string;
  excelFile?: FileList;
}

export default function Home() {
  const { handleSubmit, control, setValue, watch, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      text: "",
      theme: "",
      dateRange: undefined,
      allChannels: false,
      channels: [],
      category: "",
      excelFile: undefined,
    },
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizeOptions] = useState([5, 10, 20, 50]);
  const [excelValidation, setExcelValidation] = useState<any>(null);

  // Expected headers for product Excel file
  const expectedHeaders = [
    'รหัสสินค้า',
    'ชื่อสินค้า', 
    'หมวดหมู่',
    'ราคา',
    'จำนวนคงเหลือ'
  ];

  const handleExcelValidation = (result: any) => {
    setExcelValidation(result);
    console.log('Excel validation result:', result);
  };

  // Use useFormState to get errors

  const [selectedCategory, setSelectedCategory] = useState<string>("")

  console.log("page", page, "pageSize", pageSize,);
  const allChannels = watch("allChannels");
  const channels = watch("channels");
  const salesChannels = [
    {
      name: "allChannels",
      label: "Show All Sales Channel :",
      value: undefined,
      showBadge: false,
    },
    {
      name: "channels",
      label: "Online",
      value: "online",
      showBadge: true,
      badgeCount: 2,
    },
    {
      name: "channels",
      label: "Omni",
      value: "omni",
      showBadge: true,
      badgeCount: 2,
    },
  ];

  const products = [
    {
      id: 101,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 59.99,
      rating: 4.5,
    },
    {
      id: 102,
      name: "Yoga Mat",
      category: "Sports & Fitness",
      price: 25.0,
      rating: 4.8,
    },
    {
      id: 103,
      name: "Coffee Maker",
      category: "Home Appliances",
      price: 80.0,
      rating: 4.2,
    },
    {
      id: 104,
      name: "Running Shoes",
      category: "Sportswear",
      price: 70.0,
      rating: 4.6,
    },
    {
      id: 105,
      name: "Smartwatch",
      category: "Electronics",
      price: 120.0,
      rating: 4.7,
    },
  ];


  useEffect(() => {
    if (allChannels) {
      if (
        channels.length !== 2 ||
        !channels.includes("online") ||
        !channels.includes("omni")
      ) {
        setValue("channels", ["online", "omni"]);
      }
    } else if (channels.length > 0) {
      setValue("channels", []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allChannels]);

  useEffect(() => {
    const isAll = channels.includes("online") && channels.includes("omni");
    if (allChannels !== isAll) {
      setValue("allChannels", isAll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels]);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setValue("category", categoryId)
    console.log("Selected category:", categoryId)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-sans grid grid-cols-3 items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 bg-gray-300"
      >
        <TabComponent noBadge={true} />
        <InputText
          name="text"
          control={control}
          className="w-full"
          required
          label="Text Input"
          tooltip="This is a tooltip"
        />

        <InputText
          type="select"
          name="theme"
          control={control}
          className="w-full"
          required={true}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" },
          ]}
          clearable={true}
          tooltip="This is a tooltip"
        />
        <div className="flex items-center gap-8">
          {salesChannels.map((channel, index) => (
            <div key={index} className="flex items-center gap-2">
              <InputText
                type="checkbox"
                name={channel.name}
                value={channel.value}
                control={control}
                label={channel.label}
              />
              {channel.showBadge && (
                <Badge
                  variant="secondary"
                  className="bg-blue-400 text-white dark:bg-blue-600"
                >
                  {channel.badgeCount}
                </Badge>
              )}
            </div>
          ))}
        </div>
        <DateRangePicker name="dateRange" control={control} />
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          placeholder="กรุณาเลือกหมวดหมู่สินค้า"
          className="w-full"
          language="th"
        />
        {/* Excel File Input with Validation */}
        <div className="w-full">
          <BaseInputFile
            label="อัปโหลดไฟล์ Excel"
            tooltip="ไฟล์ต้องมี 5 คอลัมน์: รหัสสินค้า, ชื่อสินค้า, หมวดหมู่, ราคา, จำนวนคงเหลือ"
            required
            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            expectedHeaders={expectedHeaders}
            onValidation={handleExcelValidation}
            {...register("excelFile", { required: "กรุณาเลือกไฟล์ Excel" })}
            error={errors.excelFile?.message as string}
          />
          
          {/* Excel Generation Buttons */}
          <div className="mt-2 flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={generateSampleExcelFile}
            >
              📥 ดาวน์โหลดตัวอย่าง
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => generateExcelTemplate()}
            >
              📋 ดาวน์โหลดเทมเพลต
            </Button>
          </div>
          
          {/* Validation Status */}
          {excelValidation && (
            <div className={`mt-2 text-xs p-2 rounded ${
              excelValidation.isValid 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {excelValidation.isValid ? (
                <div>
                  <div className="font-medium">✓ ไฟล์ถูกต้อง</div>
                  {excelValidation.message && <div>{excelValidation.message}</div>}
                  {excelValidation.note && <div className="text-gray-600">{excelValidation.note}</div>}
                </div>
              ) : (
                <div>
                  <div className="font-medium">✗ ไฟล์ไม่ถูกต้อง</div>
                  <div>{excelValidation.error}</div>
                </div>
              )}
            </div>
          )}
        </div>
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </form>
      <DataTable
        pagination={true}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onChangePage={(page, size) => {
          setPage(page);
          setPageSize(size);
        }}
        items={products}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
          { key: "price", label: "Price" },
          { key: "rating", label: "Rating" },
        ]}

      />

    </div>
  );
}
