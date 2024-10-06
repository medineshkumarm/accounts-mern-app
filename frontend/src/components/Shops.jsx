import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import api from "../api/api";

const Shops = () => {
  const { auth } = useContext(AuthContext);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await api.get("/shops");
        setShops(res.data);
      } catch (err) {
        console.error("Error fetching shops", err);
      }
    };
    fetchShops();
  }, []);

  return (
    <div>
      <h2>Your Shops</h2>
      {auth.isAuthenticated ? (
        <ul>
          {shops.map((shop) => (
            <li key={shop._id}>
              {shop.shopName} - {shop.location}
            </li>
          ))}
        </ul>
      ) : (
        <p>You need to log in to view your shops.</p>
      )}
    </div>
  );
};

export default Shops;
