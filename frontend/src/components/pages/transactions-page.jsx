import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import AddTransactionForm from "../ui/add-transaction-form";

const TransactionsPage = () => {
  const { auth } = useContext(AuthContext);
  // const [reload, setReload] = useState(false);

  // const triggerReload = () => setReload(!reload);

  return (
    <div>
      <div>
        <AddTransactionForm />
      </div>

      <div>List of Transactions : filter by shops with dropdowns</div>
      <div>
        {/* {auth.user.shops.map((shop, id) => (
          <ul key={id}>
            <li>{shop.shopName}</li>
            <li>{shop.location}</li>
            <li>{shop.shopNo}</li>
          </ul>
        ))} */}
      </div>
      <div>Edit Transactions</div>

      <div>shop Metrics: Total income, total transactions for the shop.</div>
    </div>
  );
};

export default TransactionsPage;
