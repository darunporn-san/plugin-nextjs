"use client";

import InputText from "@/components/shared/Input-Text";
import { DateRangePicker } from "@/components/shared/Date-Range-Picker";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TabComponent from "@/components/shared/Tab-Component";
import DataTable from "@/components/shared/Data-Table";
interface FormData {
  text: string;
  theme: string;
  dateRange: string;
  allChannels: boolean;
  channels: string[];
}
export default function Home() {
  const { handleSubmit, control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      text: "",
      theme: "",
      dateRange: undefined,
      allChannels: false,
      channels: [],
    },
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizeOptions] = useState([5, 10, 20, 50]);
  // Use useFormState to get errors


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
          disabled={true}
          required
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
