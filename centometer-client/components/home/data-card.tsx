import { MoveDiagonal2Icon, GripIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

interface DataCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function DataCard(props: DataCardProps) {
  return (
    <>
      <Card className="md:w-full rounded-2xl">
        <GripIcon
          size={20}
          className="mx-4 mt-4 mb-0 drag-handle cursor-grab"
        />
        <CardHeader className="-mt-2 ">
          <CardTitle className="">{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardContent className="h-[36rem]">{props.children}</CardContent>
        <CardFooter className="p-2 mb-1 pr-1  flex w-full items-end flex-col">
          <MoveDiagonal2Icon size={20} />
        </CardFooter>
      </Card>
    </>
  );
}
