import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/auth-context";

export const RegisterForm = () => {
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
        navigate("/test/login");
      }, 1000);
    } else {
      handleError(message);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Your username" />
                </div>
                <TextInput
                  type="text"
                  id="username"
                  icon={FaRegUser}
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                  placeholder="enter an username"
                  required
                />
              </div>

              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  icon={HiMail}
                  value={formData.email}
                  onChange={onChange}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  icon={RiLockPasswordLine}
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  placeholder="password must be atleast 8 character"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/test/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
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
        </div>
      </div>
    </section>
  );
};
