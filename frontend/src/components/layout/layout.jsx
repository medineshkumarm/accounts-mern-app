/* eslint-disable no-undef */
import { Outlet, useNavigate } from "react-router-dom";
import NavBarComponent from "../ui/nav-bar";
import { SideBarComponent, SideBarComponentWithDrawer } from "../ui/side-bar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";

const Layout = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavBarComponent onMenuClick={handleDrawerToggle} />

      {/* Main Content Area */}
      <div className="flex flex-1 gap-4 p-4 flex-col md:flex-row">
        {/* Sidebar - Hidden on small screens and displayed on medium screens and up */}
        <div className=" lg:hidden">
          <SideBarComponentWithDrawer
            isOpen={isDrawerOpen}
            setIsOpen={setIsDrawerOpen}
          />
        </div>
        <div className="hidden lg:block">
          <SideBarComponent />
        </div>

        {/* Outlet for Nested Routes */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
