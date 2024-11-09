/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { AuthContext } from "../../context/auth-context";
import { IoMdMenu } from "react-icons/io";
import api from "../../api/api";
export default function NavBarComponent({ onMenuClick }) {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(
    "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
  );
  const url = "http://localhost:3000";
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate, logout]);

  useEffect(() => {
    // Fetch user profile info, including the profile picture URL
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users`);
        console.log(response);
        setProfilePicture(response.data.profilePicture); // Set profile picture URL
      } catch (error) {
        console.error("Error fetching profile picture", error);
      }
    };

    fetchUserProfile();
  }, [auth.user.id]);

  return (
    <nav className="flex space-x-6 h-14 border-b justify-between bg-white m-1 px-2">
      <div className="font-bold text-xl lg:text-2xl p-2 ml-4">KP App</div>

      <div className="flex gap-2 items-center ">
        {/* Our profile */}
        <div className="m-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={auth.user?.username || "User settings"}
                img={`${url}/${profilePicture}`}
                // style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                // className="w-[150px] h-[150px] rounded-md"
                rounded
              />
            }
          >
            <Dropdown.Header className="rounded-md">
              <span className="block text-sm">
                {auth.user?.username || "username"}
              </span>
              <span className="block truncate text-sm font-medium">
                {auth.user?.email || "name@example.com"}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="lg:hidden">
          <IoMdMenu
            className="cursor-pointer text-3xl"
            onClick={onMenuClick} // Trigger the parent function on click
          />
        </div>
      </div>
    </nav>
  );
}
