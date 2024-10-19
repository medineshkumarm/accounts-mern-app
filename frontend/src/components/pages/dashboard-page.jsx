/* eslint-disable react/prop-types */
import { TransactionCard } from "../ui/transaction-card";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";
import AddTransactionForm from "../ui/transaction-forms/add-transaction-form";

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
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <Button.Group className="flex flex-col gap-2 md:flex-row">
      <Button
        color="dark"
        className="mx-1 rounded-md"
        onClick={() => setOpenModal(true)}
      >
        <HiUserCircle className="mr-3 h-4 w-4" />
        Add Transaction
      </Button>
      {/* Add transaction modal */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <AddTransactionForm />
        </Modal.Body>
      </Modal>

      {/* implement file upload ie. xlsx,csv to upload data into db */}

      <Button color="dark" className="mx-1 rounded-md">
        <HiAdjustments className="mr-3 h-4 w-4" />
        Upload file
      </Button>

      {/* implement download of a detailed report */}
      <Button color="dark" className="mx-1 rounded-md">
        <HiCloudDownload className="mr-3 h-4 w-4" />
        View Reports
      </Button>
    </Button.Group>
  );
}
