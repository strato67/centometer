import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSearchResults, StockResult } from "@/app/dashboard/search/search";
import { LoadingSpinner } from "../ui/loading-spinner";

export default function SearchTable() {
  const searchParams = useSearchParams();
  const search = searchParams.get("results");
  const [results, setResults] = useState<Array<StockResult> | null>(null);
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
    return <div className="w-full flex justify-center mt-4"><LoadingSpinner/></div>;
  }

  if (results && results.length === 0) {
    return <p className="text-center mt-4">No results found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Symbol</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Index</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results &&
          results.map((stock, index) => (
            <Link
              href={`/dashboard/stock/?tvwidgetsymbol=${stock.Symbol}`}
              legacyBehavior
              key={index}
            >
              <TableRow className="select-none">
                <TableCell className="font-medium">{stock.Symbol}</TableCell>
                <TableCell>{stock.Description}</TableCell>
                <TableCell>{stock.Index}</TableCell>
                <TableCell className="text-right">Add</TableCell>
              </TableRow>
            </Link>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
