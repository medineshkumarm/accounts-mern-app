import { Label, TextInput, Modal, Button, Datepicker } from "flowbite-react";
import { MdPayment } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useState } from "react";

export const AddTransactionFormWithModal = () => {
  const [openModal, setOpenModal] = useState(true);
  //   const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    // setEmail("");
  }
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        position="top-left"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <FormComponent />
        </Modal.Body>
      </Modal>
    </>
  );
};

// export default AddTransactionFormWithModal;

export default function FormComponent() {
  return (
    <form className="max-w-xl md:max-w-sm space-y-2 md:space-y-3">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="date" value="Choose a date" />
        </div>
        <Datepicker />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="amount" value="enter your amount" />
        </div>
        <TextInput
          id="amount"
          type="amount"
          icon={RiMoneyRupeeCircleLine}
          placeholder="enter amount"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="paymentType" value="choose a payment type" />
        </div>
        <TextInput
          id="paymentType"
          type="paymentType"
          icon={MdPayment}
          placeholder="enter payment type"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="shop number" value="enter your shop number" />
        </div>
        <TextInput
          id="shop number"
          type="shop number"
          icon={BsShop}
          placeholder="enter shop number"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        add transaction
      </button>
    </form>
  );
}
