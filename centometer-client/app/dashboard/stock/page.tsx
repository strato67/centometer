"use client"

import { useSearchParams } from "next/navigation";
import StockBreadCrumb from "@/components/stock-breadcrumb";


export default function Page() {
    const searchParams = useSearchParams();

    const symbol = searchParams.get("tvwidgetsymbol");
    return (<>
        <div className="px-4 mt-6 w-full">
            {symbol && <StockBreadCrumb currentStock={symbol} />}
            <h1 className="text-3xl font-semibold mt-4">{symbol}</h1>
            <div className="grid"></div>
        </div>

    </>)
}