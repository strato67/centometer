import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

export default function StockOptionsCard() {
  return (
    <>
      <Card className="h-[1000px] w-full">
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>
            Change your password here. After saving, l be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2"></CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </>
  );
}
