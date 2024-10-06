import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api"; // Using the axios instance with interceptor

const AddShopForm = () => {
  const [shopDetails, setShopDetails] = useState({
    shopName: "",
    location: "",
    shopNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopDetails({ ...shopDetails, [name]: value });
  };
  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/shops", shopDetails);
      if (response.status === 201) {
        handleSuccess("Shop added successfully!");
        setShopDetails({
          shopName: "",
          location: "",
          shopNo: "",
        }); // Reset form after successful submission
      } else {
        handleError("Error adding shop");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Shop Name</label>
          <input
            type="text"
            name="shopName"
            value={shopDetails.shopName}
            onChange={handleChange}
            placeholder="Enter shop name"
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={shopDetails.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>
        <div>
          <label>Shop No</label>
          <input
            type="text"
            name="shopNo"
            value={shopDetails.shopNo}
            onChange={handleChange}
            placeholder="Enter shop number"
            required
          />
        </div>
        <button type="submit">Add Shop</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddShopForm;
