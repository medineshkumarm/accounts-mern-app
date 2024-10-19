/* eslint-disable react/prop-types */
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

const EditTransactionForm = ({ transaction, onChange, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: transaction.date,
    amount: transaction.amount,
    paymentType: transaction.paymentType,
    shopName: transaction.shopName,
  });
console.log(formData.date.split("T")[0]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    onChange(); // Mark form as dirty
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass updated form data back
  };


  return (
    <form onSubmit={handleSubmit}>
      <Label>Date:</Label>
      <TextInput
        type="date"
        name="date"
        value={formData.date.split("T")[0]}
        onChange={handleChange}
      />

      <Label>Amount:</Label>
      <TextInput
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <Label>Payment Type:</Label>
      <TextInput
        type="text"
        name="paymentType"
        value={formData.paymentType}
        onChange={handleChange}
      />

      <Label>Shop Name:</Label>
      <TextInput
        type="text"
        name="shopName"
        value={formData.shopName}
        onChange={handleChange}
        className="form-input"
      />

      <div className="flex space-x-2 justify-between pt-2">
        <Button type="submit">Save</Button>
        <Button type="button"  onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
