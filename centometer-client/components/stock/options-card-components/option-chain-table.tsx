import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionsChain } from "../stockType";

const TableSection = ({
  label,
  data,
}: {
  label: string;
  data: OptionsChain["calls"];
}) => {
  return (
    <TabsContent value={label}>
      <Table>
        <TableHeader>
          <div className="text-2xl font-semibold leading-none tracking-tight mb-2">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </div>
          <TableRow>
            <TableHead className="w-[100px]">Contract Symbol</TableHead>
            <TableHead>Last Trade Date</TableHead>
            <TableHead>Strike</TableHead>
            <TableHead>Last Price</TableHead>
            <TableHead>Bid</TableHead>
            <TableHead>Ask</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>% Change</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Open Interest</TableHead>
            <TableHead>Implied Volatility</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contract) => (
            <TableRow
              key={contract.contractSymbol}
              className={`${contract.inTheMoney ? "bg-secondary" : ""}`}
            >
              <TableCell className="font-medium">{contract.contractSymbol}</TableCell>
              <TableCell>{contract.lastTradeDate}</TableCell>
              <TableCell>{contract.strike}</TableCell>
              <TableCell>{contract.lastPrice.toFixed(2)}</TableCell>
              <TableCell>{contract.bid.toFixed(2)}</TableCell>
              <TableCell>{contract.ask.toFixed(2)}</TableCell>
              <TableCell
                className={`${
                  contract.change > 0
                    ? "text-[#22c55e]"
                    : contract.change < 0
                    ? "text-destructive"
                    : ""
                }`}
              >
                {contract.change === 0 ? "" : contract.change > 0 ? "+" : "-"}
                {Math.abs(contract.change).toFixed(2)}
              </TableCell>
              <TableCell
                className={`${
                  contract.percentChange > 0
                    ? "text-[#22c55e]"
                    : contract.percentChange < 0
                    ? "text-destructive"
                    : ""
                }`}
              >
                {contract.percentChange === 0
                  ? ""
                  : contract.percentChange > 0
                  ? "+"
                  : "-"}
                {Math.abs(contract.percentChange).toFixed(2)}
              </TableCell>
              <TableCell>{contract.volume}</TableCell>
              <TableCell>{contract.openInterest}</TableCell>
              <TableCell>{contract.impliedVolatility}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabsContent>
  );
};

export default function OptionChainTable({
  optionsChain,
}: {
  optionsChain: OptionsChain;
}) {
  const tabConfig = [
    { label: "calls", data: optionsChain.calls },
    { label: "puts", data: optionsChain.puts },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="calls">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-1/2 max-w-sm grid-cols-2">
            {tabConfig.map(({ label }) => (
              <TabsTrigger key={label} value={label}>
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2 items-center">
            <div className="bg-secondary w-5 h-5 rounded-xl"></div>
            <p>In the Money</p>
          </div>
        </div>

        {tabConfig.map(({ label, data }) => (
          <TableSection key={label} label={label} data={data} />
        ))}
      </Tabs>
    </div>
  );
}
