import { Card } from "flowbite-react";
export function TransactionCard() {
  return (
    <Card className="grid grid-cols-1">
      <div className="flex gap-2 justify-between">
        <h1 className="font-semibold text-md">Total Income</h1>
        <p className="opacity-70">₹</p>{" "}
      </div>
      <p className="font-bold text-md">₹ 5200</p>
    </Card>
  );
}
