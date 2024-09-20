import { Card, CardHeader, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils"

export default function LoadingCard({className}: {className?: string}) {
    return (

        <Card className={cn(className)} >
            <CardHeader className="flex flex-row w-full justify-between">
                <div className="space-y-1.5">
                    <Skeleton className="h-12 w-80 rounded-xl"/>
                </div>                
            </CardHeader>
            <CardContent>
                <div className="space-y-8 mt-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />


                </div>



            </CardContent>
        </Card>


)
}

