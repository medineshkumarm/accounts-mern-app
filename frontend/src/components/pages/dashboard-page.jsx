/* eslint-disable react/prop-types */
import { TransactionCard } from "../ui/transaction-card";
import { Button} from "flowbite-react";

import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";

const DashboardPage = () => {
  return (
    <div className="max-w-full">
      <div className="grid md:grid-cols-3 gap-4 py-2">
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
      <div className="py-4">
        <ButtonGroupComponent />
      </div>
      <div></div>
    </div>
  );
};

export default DashboardPage;

export function ButtonGroupComponent() {
  return (
    <Button.Group className="flex flex-col gap-2 md:flex-row">
      <Button color="dark" className="mx-1 rounded-md">
        <HiUserCircle className="mr-3 h-4 w-4" />
        Add Transaction
      </Button>
      <Button color="dark" className="mx-1 rounded-md">
        <HiAdjustments className="mr-3 h-4 w-4" />
        Upload file
      </Button>
      <Button color="dark" className="mx-1 rounded-md">
        <HiCloudDownload className="mr-3 h-4 w-4" />
        View Reports
      </Button>
    </Button.Group>
  );
}
