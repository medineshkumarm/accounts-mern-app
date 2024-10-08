import api from "../../api/api";
import { handleError } from "./toast-function";

export const addShopDetails = async (shopName, location, shopNo) => {
  try {
    const res = await api.post("/shops", { shopName, location, shopNo });
    return res;
  } catch (error) {
    console.error("Failed to add shop details", error);
    handleError("Error adding shop details");
  }
};


