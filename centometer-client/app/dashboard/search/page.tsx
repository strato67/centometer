import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { SearchTable } from "@/components/search/search-table"

export default function Page() {
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center h-1/3 ">
                <h1 className="text-3xl font-semibold mb-4 ">Search</h1>
                <div className="flex w-96 max-w-sm items-center space-x-1">
                <Input type="text" placeholder="Enter a company name or symbol" className="rounded-l-3xl rounded-r-none outline-none   "/>
                <Button className="h-10 rounded-r-3xl rounded-l-none"><Search/></Button>

                </div>

            </div>

            <div className="flex flex-col w-full px-4"> 
            
                <h2 className="text-xl font-semibold mb-4">Results for ""</h2>

                <SearchTable/>

                
            </div>

        </>

    )
}