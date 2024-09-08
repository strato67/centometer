"use client"

import { useSearchParams } from "next/navigation";

export default function Page(){
    const searchParams = useSearchParams();

    const symbol = searchParams.get("tvwidgetsymbol");
    return(<>{symbol}</>)
}