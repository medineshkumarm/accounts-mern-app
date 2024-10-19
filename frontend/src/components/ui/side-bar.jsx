/* eslint-disable react/prop-types */
import { Sidebar, Drawer } from "flowbite-react";
import { BiSolidDashboard } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoSettingsSharp, IoLogOutSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const SideBarComponent = () => {
  return (
    <Sidebar className="">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center text-gray-600 hover:text-blue-600 rounded-lg transition ${
                isActive ? "font-semibold text-blue-600 bg-blue-100" : ""
              }`
            }
          >
            <Sidebar.Item icon={BiSolidDashboard}>Dashboard</Sidebar.Item>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex items-center text-gray-600 hover:text-blue-600 rounded-lg transition ${
                isActive ? "font-semibold text-blue-600 bg-blue-100" : ""
              }`
            }
          >
            <Sidebar.Item icon={GrTransaction}>Transactions</Sidebar.Item>
          </NavLink>
          <NavLink
            to="/shops"
            className={({ isActive }) =>
              `flex items-center text-gray-600 hover:text-blue-600 rounded-lg transition ${
                isActive ? "font-semibold text-blue-600 bg-blue-100" : ""
              }`
            }
          >
            <Sidebar.Item icon={SiHomeassistantcommunitystore}>
              Shops
            </Sidebar.Item>
          </NavLink>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center text-gray-600 hover:text-blue-600 rounded-lg transition ${
                isActive ? "font-semibold text-blue-600 bg-blue-100" : ""
              }`
            }
          >
            <Sidebar.Item icon={IoSettingsSharp}>settings</Sidebar.Item>
          </NavLink>
          <Sidebar.Item
            icon={IoLogOutSharp}
            onClick={() => alert("log out ing...")}
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

// export default SideBarComponent;

export const SideBarComponentWithDrawer = ({ isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      {/* Drawer with the controlled state */}
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Items>
          <Sidebar className="flex-1">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <NavLink
                  onClick={handleClose}
                  to="/"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                >
                  <Sidebar.Item icon={BiSolidDashboard}>Dashboard</Sidebar.Item>
                </NavLink>
                <NavLink
                  onClick={handleClose}
                  to="/transactions"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                >
                  <Sidebar.Item icon={GrTransaction}>Transactions</Sidebar.Item>
                </NavLink>
                <NavLink
                  onClick={handleClose}
                  to="/shops"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                >
                  <Sidebar.Item icon={SiHomeassistantcommunitystore}>
                    Shops
                  </Sidebar.Item>
                </NavLink>
              </Sidebar.ItemGroup>

              <Sidebar.ItemGroup>
                <NavLink
                  onClick={handleClose}
                  to="/settings"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                >
                  <Sidebar.Item icon={IoSettingsSharp}>Settings</Sidebar.Item>
                </NavLink>
                <Sidebar.Item icon={IoLogOutSharp}>
                  <NavLink
                    onClick={handleClose}
                    to="/settings"
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-blue-600 ${
                        isActive ? "font-semibold text-blue-600" : ""
                      }`
                    }
                  >
                    Logout
                  </NavLink>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};
