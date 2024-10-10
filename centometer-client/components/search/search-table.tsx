import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSearchResults, StockWatchListResult } from "@/app/actions/search";
import { LoadingSpinner } from "../ui/loading-spinner";
import AddSearchButton from "./add-search-button";

export default function SearchTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("results");
  const [results, setResults] = useState<Array<StockWatchListResult> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (search) {
        setLoading(true);
        setResults(await getSearchResults(search));
        setLoading(false);
      }
    })();
  }, [search]);

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (results && results.length === 0) {
    return <p className="text-center mt-4">No results found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="w-7/12">Name</TableHead>
          <TableHead className="w-1/5"></TableHead>
          <TableHead>Index</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results &&
          results.map((stock, index) => (
            <TableRow
              className="select-none"
              key={index}
              onClick={() =>
                router.push(
                  stock.Index === "IDX" || stock.Index === "NYSE American"
                    ? `/dashboard/stock/?tvwidgetsymbol=${stock.Symbol}`
                    : `/dashboard/stock/?tvwidgetsymbol=${stock.Index}%3A${stock.Symbol}`
                )
              }
            >
              <TableCell className="font-medium">{stock.Symbol}</TableCell>
              <TableCell>{stock.Description}</TableCell>
              <TableCell className="text-right">
                <AddSearchButton
                  indexName={stock.Index}
                  symbolName={stock.Symbol}
                  initialState={stock.inWatchlist}
                />
              </TableCell>
              <TableCell>{stock.Index}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
