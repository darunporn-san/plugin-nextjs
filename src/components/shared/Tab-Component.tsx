import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
const tabs = [
  {
    name: "pnpm",
    value: "pnpm",
    content: "pnpm dlx shadcn@latest add tabs",
    count: 9,
  },
  {
    name: "npm",
    value: "npm",
    content: "npx shadcn@latest add tabs",
  },
  {
    name: "yarn",
    value: "yarn",
    content: "npx shadcn@latest add tabs",
    count: 3,
  },
  {
    name: "bun",
    value: "bun",
    content: "bunx --bun shadcn@latest add tabs",
  },
];

interface TabComponentProps {
  noBadge?: boolean;
}

const TabComponent = ({ noBadge = true }: TabComponentProps) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="max-w-xs w-full">
      <TabsList className="w-full p-0 justify-start gap-1 rounded-b-none bg-transparent ">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-full bg-amber-400 data-[state=active]:shadow-none data-[state=active]:bg-green-500  border-transparent rounded-t-md rounded-b-none"
          >
            <code className="text-[13px]">{tab.name}</code>{" "}
            {!!tab.count && !noBadge && (
              <Badge
                className="ml-2 px-1 bg-blue-500 text-white py-0 text-xs rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white"
                variant="secondary"
              >
                {tab.count}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="bg-white px-2 rounded-b-md border border-gray-200">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="h-10 flex items-center justify-between gap-2 ">
              <code className="text-[13px]">{tab.content}</code>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
export default TabComponent;
