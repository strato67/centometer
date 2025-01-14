import { MoveDiagonal2Icon } from "lucide-react";
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
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardContent className="h-[36rem]">{props.children}</CardContent>
        <CardFooter className="p-2 mb-1 pr-1  flex w-full items-end flex-col">
            <MoveDiagonal2Icon size={20}/>
          </CardFooter>
      </Card>
    </>
  );
}
