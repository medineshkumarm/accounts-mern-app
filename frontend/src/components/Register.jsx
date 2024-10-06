import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

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
  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await register(
      formData.email,
      formData.username,
      formData.password
    );

    const { success, message } = data;
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      handleError(message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col ">
        <h2>Register</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <button type="submit">Register</button>
        <span className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </Link>
        </span>
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
