import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
// import AddTransactionForm from "../ui/transaction-forms/add-transaction-form";
import ShopTransactionsTable from "../ui/table/shop-transaction-table";
import api from "../../api/api";

const TransactionsPage = () => {
  const { auth } = useContext(AuthContext);
  const [shops, setShops] = useState([]); // State for shops

  useEffect(() => {
    const fetchShops = async () => {
      if (auth.token) {
        try {
          const response = await api.get("/shops");
          // console.log(response);
          setShops(response.data);
        } catch (error) {
          console.error("Error fetching shop data:", error);
        }
      }
    };

    fetchShops();
  }, [auth.token]);
  return (
    <div>
      {/* <div>
        <AddTransactionForm />
      </div> */}

      <div>List of Transactions : filter by shops with dropdowns</div>
      <div>
        <ShopTransactionsTable shops={shops} />
      </div>
      <div>Edit Transactions</div>

      <div>shop Metrics: Total income, total transactions for the shop.</div>
    </div>
  );
};

export default TransactionsPage;
