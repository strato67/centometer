import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {

    return (<>
        <div className="px-4 mt-6 w-full">
            <Skeleton className="w-1/2 h-16 rounded-full" />
            <div className="grid justify-center grid-rows-3 md:grid-rows-2 grid-flow-row md:grid-cols-2 w-full gap-4 md:gap-y-0 mt-12">
                <div className="md:col-span-2 mb-4">
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>

            </div>
        </div>
    </>)


}

