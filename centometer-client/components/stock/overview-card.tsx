import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    
  } from "@/components/ui/card";

export default function OverviewCard(){
    return(<>
    
    <Card className="w-full rounded-b-3xl rounded-t-none p-4 pb-12">
        <CardHeader className="flex flex-row w-full justify-between">
          <div className="space-y-1.5">
            <CardTitle>Overview</CardTitle>

          </div>

        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>
    
    </>)
}