import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
// import AddShopForm from "./add-shop-detail-form";

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);

  return auth.isAuthenticated ? (
    <>
      <p>You are Authenticated : </p>
      {/* {auth.user.map((item, id) => (
        <ul key={id}>
          <li>{item.email}</li>
          <li>{item.username}</li>
          <li>{item.password}</li>
        </ul>
      ))} */}
      {/* <AddShopForm /> */}
      <button onClick={() => logout()} className=" rounded-md bg-green-400 px-5 py-2  hover:bg-green-900 mx-auto my-2 border-solid">Logout</button>
    </>
  ) : (
    <p>Not Authenticated</p>
  );
};

export default Dashboard;
