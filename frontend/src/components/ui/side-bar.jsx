import { Sidebar, Drawer, Button } from "flowbite-react";
import { BiSolidDashboard } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoSettingsSharp, IoLogOutSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const SideBarComponent = () => {
  return (
    <Sidebar className="">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <NavLink
            to="/test"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            <Sidebar.Item icon={BiSolidDashboard}>Dashboard</Sidebar.Item>
          </NavLink>
          <NavLink
            to="/test/transactions"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            <Sidebar.Item icon={GrTransaction}>Transactions</Sidebar.Item>
          </NavLink>
          <NavLink
            to="/test/shops"
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
            to="/test/settings"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            <Sidebar.Item icon={IoSettingsSharp}>settings</Sidebar.Item>
          </NavLink>
          <Sidebar.Item icon={IoLogOutSharp} onClick = {() => alert("log out ing...")}>Logout</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

// export default SideBarComponent;

export const SideBarComponentWithDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="">
      <Button onClick={() => setIsOpen(true)}>Show body scrolling</Button>
      <div className="flex flex-col items-center justify-center">
        <div className="h-[100rem]" />
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Items>
          <Sidebar className="">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <NavLink
                  to="/test"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                >
                  <Sidebar.Item icon={BiSolidDashboard}>Dashboard</Sidebar.Item>
                </NavLink>
                <NavLink
                  to="/test/transactions"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                >
                  <Sidebar.Item icon={GrTransaction}>Transactions</Sidebar.Item>
                </NavLink>
                <NavLink
                  to="/test/shops"
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
                  to="/test/settings"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 ${
                      isActive ? "font-semibold text-blue-600" : ""
                    }`
                  }
                >
                  <Sidebar.Item icon={IoSettingsSharp}>settings</Sidebar.Item>
                </NavLink>
                <Sidebar.Item icon={IoLogOutSharp}>
                  <NavLink
                    to="/test/settings"
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
