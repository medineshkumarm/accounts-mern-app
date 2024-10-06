import { TransactionCard } from "../ui/transaction-card";
import { FaEdit } from "react-icons/fa";
import { Button, Table, Card } from "flowbite-react";
const recentTransactions = [
  {
    date: "2023-05-01",
    amount: 150,
    paymentType: "Credit Card",
    shopName: "Shop A",
  },
  { date: "2023-05-02", amount: 75, paymentType: "Cash", shopName: "Shop B" },
  {
    date: "2023-05-03",
    amount: 200,
    paymentType: "PayPal",
    shopName: "Shop C",
  },
  {
    date: "2023-05-04",
    amount: 100,
    paymentType: "Credit Card",
    shopName: "Shop A",
  },
];
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
      <div>
        <TableComponent />
      </div>
    </div>
  );
};

export default DashboardPage;

export function TableComponent() {
  return (
    <Card className="overflow-x-auto ">
      <div>
        <h1 className="font-bold text-xl py-2">Recent transactions</h1>
      </div>
      <Table className="mx-auto my-2 border-spacing-1 ">
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Payment Type</Table.HeadCell>
          <Table.HeadCell>Shop Name</Table.HeadCell>
          <Table.HeadCell>More</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {recentTransactions.map((item, id) => (
            <Table.Row
              key={id}
              className=" border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <Table.Cell className="font-bold text-gray-700">
                {item.date}
              </Table.Cell>
              <Table.Cell> {item.amount}</Table.Cell>
              <Table.Cell> {item.paymentType}</Table.Cell>
              <Table.Cell> {item.shopName}</Table.Cell>
              <Table.Cell>
                <Button size="sm" gradientDuoTone="greenToBlue">
                  <FaEdit className="mr-2 h-5 w-5" />
                  edit
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
}

import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";

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
