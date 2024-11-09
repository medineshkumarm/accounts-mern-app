/* eslint-disable react/prop-types */
import { Sidebar, Drawer } from "flowbite-react";
import { GrTransaction } from "react-icons/gr";
import {
  MdOutlineStorefront,
  MdOutlineDashboardCustomize,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlineAnalytics,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

// Reusable SidebarLink component
const SidebarLink = ({ to, icon, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center text-gray-600 hover:text-blue-600 rounded-lg transition ${
        isActive ? "font-semibold text-blue-600 bg-blue-100" : ""
      }`
    }
  >
    <Sidebar.Item icon={icon}>{children}</Sidebar.Item>
  </NavLink>
);

// Sidebar Component
export const SideBarComponent = () => (
  <Sidebar>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <SidebarLink to="/" icon={MdOutlineDashboardCustomize}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/analytics" icon={MdOutlineAnalytics}>
          Analytics
        </SidebarLink>
        <SidebarLink to="/transactions" icon={GrTransaction}>
          Transactions
        </SidebarLink>
        <SidebarLink to="/shops" icon={MdOutlineStorefront}>
          Shops
        </SidebarLink>
      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <SidebarLink to="/settings" icon={MdOutlineSettings}>
          Settings
        </SidebarLink>
        <Sidebar.Item
          icon={MdOutlineLogout}
          onClick={() => alert("Logging out...")}
        >
          Logout
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
);

// Drawer Component with Sidebar for smaller screens
export const SideBarComponentWithDrawer = ({ isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <Drawer.Items>
        <Sidebar className="flex-1">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <SidebarLink
                to="/"
                icon={MdOutlineDashboardCustomize}
                onClick={handleClose}
              >
                Dashboard
              </SidebarLink>
              <SidebarLink
                to="/analytics"
                icon={MdOutlineAnalytics}
                onClick={handleClose}
              >
                Analytics
              </SidebarLink>
              <SidebarLink
                to="/transactions"
                icon={GrTransaction}
                onClick={handleClose}
              >
                Transactions
              </SidebarLink>
              <SidebarLink
                to="/shops"
                icon={MdOutlineStorefront}
                onClick={handleClose}
              >
                Shops
              </SidebarLink>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <SidebarLink
                to="/settings"
                icon={MdOutlineSettings}
                onClick={handleClose}
              >
                Settings
              </SidebarLink>
              <Sidebar.Item icon={MdOutlineLogout} onClick={handleClose}>
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  );
};
