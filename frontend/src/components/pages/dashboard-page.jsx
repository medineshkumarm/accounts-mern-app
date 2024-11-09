import { TransactionCard } from "../ui/transaction-card";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";
import AddTransactionForm from "../ui/transaction-forms/add-transaction-form";
import ExcelUploadModal from "../ui/upload/upload-modal";

const DashboardPage = () => {
  return (
    <div className="max-w-full">
      <div className="grid md:grid-cols-3 gap-4 py-2">
        <TransactionCard
          title={"Total Income"}
          currentAmount={"1000"}
          totalAmount={"10000"}
        />
        <TransactionCard
          title={"Total Profit"}
          currentAmount={"10233"}
          totalAmount={"20000"}
        />
        <TransactionCard
          title={"Daily Profit"}
          currentAmount={"900"}
          totalAmount={"1000"}
        />
      </div>
      <div className="py-4">
        <ButtonGroupComponent />
      </div>
      <div>charts</div>
    </div>
  );
};

export default DashboardPage;

export function ButtonGroupComponent() {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <Button.Group className="flex flex-col gap-2 md:flex-row">
      <Button
        color="dark"
        className="mx-1 rounded-md"
        onClick={() => setIsAddTransactionModalOpen(true)}
      >
        <HiUserCircle className="mr-3 h-4 w-4" />
        Add Transaction
      </Button>
      {/* Add transaction modal */}
      <Modal
        show={isAddTransactionModalOpen}
        size="md"
        onClose={() => setIsAddTransactionModalOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <AddTransactionForm />
        </Modal.Body>
      </Modal>

      <Button
        color="dark"
        className="mx-1 rounded-md"
        onClick={() => setIsUploadModalOpen(true)}
      >
        <HiAdjustments className="mr-3 h-4 w-4" />
        Upload file
      </Button>
      {/* Upload modal */}
      <Modal
        show={isUploadModalOpen}
        size="md"
        onClose={() => setIsUploadModalOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <ExcelUploadModal />
        </Modal.Body>
      </Modal>

      <Button color="dark" className="mx-1 rounded-md">
        <HiCloudDownload className="mr-3 h-4 w-4" />
        View Reports
      </Button>
    </Button.Group>
  );
}
