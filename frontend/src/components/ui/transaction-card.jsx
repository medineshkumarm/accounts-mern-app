/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";

export function TransactionCard({ title, totalAmount, currentAmount }) {
  // Current total income and total target

  // Calculate progress percentage
  const progress = (currentAmount / totalAmount) * 100;

  return (
    <Card className="grid grid-cols-1 ">
      <div className="flex gap-2 justify-between">
        <h1 className="font-semibold text-md">{title}</h1>
        <p className="opacity-70">₹</p>
      </div>

      <p className="font-bold text-md">₹ {currentAmount}</p>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-xs mt-1">
          {Math.round(progress)}% of ₹ {totalAmount}
        </p>
      </div>
    </Card>
  );
}

// import { Card } from "flowbite-react";
// export function TransactionCard() {
//   return (
//     <Card className="grid grid-cols-1">
//       <div className="flex gap-2 justify-between">
//         <h1 className="font-semibold text-md">Total Income</h1>
//         <p className="opacity-70">₹</p>{" "}
//       </div>
//       <p className="font-bold text-md">₹ 5200</p>
//     </Card>
//   );
// }
