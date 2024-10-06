import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "../ui/scroll-area";

export default function NewsCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (<>
    <Card className="md:w-full rounded-2xl ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent >
      <ScrollArea className="h-72 w-full rounded-md border">
      <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1 h-auto">
            <p className="text-lg font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground overflow-y-hidden text-ellipsis">
              Send notifications to device. 
            </p>
          </div>
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>


        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>


        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>


        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>


        </div>

      </ScrollArea>
        

      </CardContent>

    </Card>
  </>);
}
