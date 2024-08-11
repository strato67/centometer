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

const results = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    currentPrice: "$210.00",
    analystRating: "Buy",
  },

];

export function SearchTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Symbol</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Current Price</TableHead>
          <TableHead className="text-right">Analyst Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((stock) => (
          <Link href={"/"} legacyBehavior key={stock.symbol}>
            <TableRow>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.company}</TableCell>
              <TableCell>{stock.currentPrice}</TableCell>
              <TableCell className="text-right">
                {stock.analystRating}
              </TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
