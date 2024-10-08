/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, Table, Button } from "flowbite-react";
import { FaEdit } from "react-icons/fa";

const ShopTransactions = ({ shops }) => {
  const [selectedShopId, setSelectedShopId] = useState("");
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [filterShopName, setFilterShopName] = useState("All Shops");

  // Collect all transactions from all shops
  const allTransactions = shops.flatMap((shop) => shop.transactions);

  // Handle shop selection via buttons
  const handleShopChoice = (shopId, shopName) => {
    setSelectedShopId(shopId);
    setFilterShopName(shopName || "All Shops");

    const transactionsToDisplay = shopId
      ? shops.find((shop) => shop._id === shopId)?.transactions || []
      : allTransactions;

    setRecentTransactions(transactionsToDisplay);
  };

  // Set all transactions as default initially
  useEffect(() => {
    setRecentTransactions(allTransactions);
  }, [shops, allTransactions]);

  return (
    <>
      <h1 className="font-bold text-xl py-2">Recent Transactions</h1>
      <h3>{filterShopName}</h3>
      <Button.Group className="my-4">
        <Button
          color={selectedShopId === "" ? "gray" : "light"}
          onClick={() => handleShopChoice("", "All Shops")}
        >
          All Shops
        </Button>
        {shops.map((shop) => (
          <Button
            key={shop._id}
            color={selectedShopId === shop._id ? "gray" : "light"}
            onClick={() => handleShopChoice(shop._id, shop.shopName)}
          >
            {shop.shopName}
          </Button>
        ))}
      </Button.Group>
      <Card className="overflow-x-auto">
        <div>
          {/* Transactions Table */}
          <Table className="mx-auto my-2 border-spacing-1">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Payment Type</Table.HeadCell>
              <Table.HeadCell>Shop Name</Table.HeadCell>
              <Table.HeadCell>More</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((item, id) => (
                  <Table.Row
                    key={id}
                    className="border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <Table.Cell className="font-bold text-gray-700">
                      {new Date(item.date).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{item.amount}</Table.Cell>
                    <Table.Cell>{item.paymentType}</Table.Cell>
                    <Table.Cell>{item.shopName}</Table.Cell>
                    <Table.Cell>
                      <Button size="sm" gradientDuoTone="greenToBlue">
                        <FaEdit className="mr-2 h-5 w-5" />
                        Edit
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="5" className="text-center">
                    No transactions available
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default ShopTransactions;
