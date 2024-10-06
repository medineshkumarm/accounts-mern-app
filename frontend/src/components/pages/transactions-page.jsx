import AddTransactionForm from "../ui/add-transaction-form";

const TransactionsPage = () => {
  return (
    <div>
      <div>
        <AddTransactionForm />
      </div>

      <div>List of Transactions : filter by shops with dropdowns</div>

      <div>Edit Transactions</div>

      <div>shop Metrics: Total income, total transactions for the shop.</div>
    </div>
  );
};

export default TransactionsPage;
