import { Label, TextInput, Select, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import api from "../../../api/api";
import { AuthContext } from "../../../context/auth-context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  handleError,
  handleSuccess,
} from "../../../utils/functions/toast-function";

const AddTransactionForm = () => {
  const { auth } = useContext(AuthContext);
  const [shops, setShops] = useState([]); // State for shops
  const [selectedShop, setSelectedShop] = useState(""); // State for selected shopId
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    paymentType: "",
    shopName: "", // Keep shop name separately
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      if (auth.token) {
        try {
          const response = await api.get("/shops");
          setShops(response.data);
        } catch (error) {
          console.error("Error fetching shop data:", error);
          handleError("Failed to load shops");
        }
      }
    };

    fetchShops();
  }, [auth.token]);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  // Handle shop selection
  const handleShopChange = (e) => {
    const selectedShopId = e.target.value;
    const selectedShopName = shops.find(
      (shop) => shop._id === selectedShopId
    )?.shopName; // Optional chaining to avoid errors if shop is not found

    // Update both shopId and shopName in state
    setSelectedShop(selectedShopId); // Store shop ID separately for the params
    setFormData({
      ...formData,
      shopName: selectedShopName || "", // Store shop name in formData
    });
  };

  const addTransaction = async (formData) => {
    try {
      const res = await api.post(
        `/transactions/${selectedShop}`, // Use selectedShop (shop ID) for params
        formData // Send formData with shopName and other fields
      );
      return res;
    } catch (error) {
      console.error("Error adding transaction:", error);
      handleError("Failed to add transaction");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedShop) {
      handleError("Please select a shop");
      return;
    }

    setLoading(true);
    try {
      const { data } = await addTransaction(formData);
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Something went wrong while adding the transaction");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl md:max-w-sm space-y-2 md:space-y-3"
      >
        <div>
          <Label htmlFor="date" value="Choose a date" />
          <TextInput
            id="date"
            type="date"
            name="date"
            onChange={onChange}
            value={formData.date}
            placeholder="enter date"
            required
          />
        </div>
        <div>
          <Label htmlFor="amount" value="Enter your amount" />
          <TextInput
            id="amount"
            type="number"
            name="amount"
            onChange={onChange}
            value={formData.amount}
            placeholder="enter amount"
            required
          />
        </div>
        <div>
          <Label htmlFor="paymentType" value="Choose a payment type" />
          <TextInput
            id="paymentType"
            name="paymentType"
            onChange={onChange}
            value={formData.paymentType}
            placeholder="enter payment type"
            required
          />
        </div>

        <div>
          <Label htmlFor="shop" value="Select your shop" />
          <Select
            id="shop"
            name="shopId" // Name for the select input
            onChange={handleShopChange} // Handle both shopName and shopId
            value={selectedShop} // Value is the selected shopId
            required
            aria-label="Shop Selection" // ARIA label for accessibility
          >
            <option value="">Select a shop</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop.shopName}
              </option>
            ))}
          </Select>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {loading ? <Spinner aria-label="Loading..." /> : " Add Transaction"}
        </button>
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AddTransactionForm;
