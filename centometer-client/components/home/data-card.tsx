import { MoveDiagonal2Icon, GripIcon, } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import CardDropDown from "./card-dropdown";
import { WidgetKeys } from "@/utils/hooks/dashboardlayout";

interface DataCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onRemove: (widgetKey: WidgetKeys) => Promise<void>;
  widgetKey: WidgetKeys;
}

export default function DataCard(props: DataCardProps) {
  return (
    <>
      <Card className="md:w-full rounded-2xl min-w-80 z-10">
        <div className="flex flex-row px-4 mt-4 mb-0 w-full justify-between">
          <GripIcon size={20} className="drag-handle cursor-grab" />
          <CardDropDown onRemove={props.onRemove} widgetKey={props.widgetKey}/>
        </div>
        <CardHeader className="-mt-2 px-4 ">
          <CardTitle className="">{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardContent className="h-[36rem] min-h-72 w-full px-4 ">{props.children}</CardContent>
        <CardFooter className="p-2 mb-1 pr-1  flex w-full items-end flex-col">
          <MoveDiagonal2Icon size={20} />
        </CardFooter>
      </Card>
    </>
  );
}
