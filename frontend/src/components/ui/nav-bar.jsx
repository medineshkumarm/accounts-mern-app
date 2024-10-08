import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { AuthContext } from "../../context/auth-context";

export default function NavBarComponent() {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate, logout]);

  return (
    <nav className="flex space-x-6 h-14 border-b justify-between bg-white m-1 px-2">
      <div className="font-bold text-2xl p-2 ml-4">Company Logo here</div>

      <div className="flex gap-4 items-center p-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt={auth.user?.username || "User settings"}
              img={
                auth.user?.profilePicture ||
                "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
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
    </nav>
  );
}
