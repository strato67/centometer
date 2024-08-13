"use client";

import SearchTable from "@/components/search/search-table";
import SearchBar from "@/components/search/search-bar";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const search = searchParams.get("results");

  return (
    <>
      <SearchBar />

      {search !== "" && (
        <div className="flex flex-col w-full px-4">
          <h2 className="text-xl font-semibold mb-4">
            Results for &quot;{search}&quot;
          </h2>

          <SearchTable />
        </div>
      )}
    </>
  );
}
