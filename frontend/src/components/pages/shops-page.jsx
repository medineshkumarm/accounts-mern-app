/* eslint-disable react/prop-types */
import { Label, TextInput, Button, Table, Modal } from "flowbite-react";
import { BsShop } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from "../../context/auth-context";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/api";
import clsx from "clsx";

const ShopsPage = () => {
  const [reload, setReload] = useState(false);

  const triggerReload = () => setReload(!reload); // Toggle reload state to refetch shops

  return (
    <div>
      <div>
        <h1 className="font-bold py-2 text-xl">Add Shop Details</h1>
        <hr />
        <AddShopFormComponent onShopAdded={triggerReload} />{" "}
      </div>

      <div>
        <h1 className="font-bold px-2 mb-2 text-xl">All Shop Details</h1>
        <hr />
        <ShopTableComponent
          reload={reload}
          onShopUpdated={triggerReload}
        />{" "}
      </div>
    </div>
  );
};

export default ShopsPage;

export function AddShopFormComponent({ onShopAdded }) {
  const [formData, setFormData] = useState({
    shopName: "",
    location: "",
    shopNo: "",
  });

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

  const addShopDetails = async (shopName, location, shopNo) => {
    try {
      const res = await api.post("/shops", { shopName, location, shopNo });
      return res;
    } catch (error) {
      console.error("Failed to add shop details", error);
      handleError("Error adding shop details");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addShopDetails(
      formData.shopName,
      formData.location,
      formData.shopNo
    );
    const { success, message } = data;
    if (success) {
      handleSuccess(message);
      onShopAdded(); 
    } else {
      handleError(message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-xl space-y-2 md:space-y-3">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shop name" value="Enter your shop name" />
          </div>
          <TextInput
            id="shopName"
            name="shopName"
            type="text"
            icon={BsShop}
            value={formData.shopName}
            onChange={onChange}
            placeholder="Enter shop name"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="location" value="Enter your location" />
          </div>
          <TextInput
            id="location"
            type="text"
            icon={FaLocationDot}
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Enter shop location"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="shop number" value="Enter your shop number" />
          </div>
          <TextInput
            id="shopNo"
            type="text"
            icon={BsShop}
            name="shopNo"
            value={formData.shopNo}
            onChange={onChange}
            placeholder="Enter shop number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Add Shop Details
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export function ShopTableComponent({ reload, onShopUpdated }) {
  const { auth } = useContext(AuthContext);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [currentShop, setCurrentShop] = useState(null); // Track shop being edited

  useEffect(() => {
    const fetchShops = async () => {
      if (auth.token) {
        try {
          const response = await api.get("/shops");
          setShops(response.data);
        } catch (error) {
          console.error("Error fetching shop data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchShops();
  }, [auth.token, reload]);

  const handleDelete = async (shopId) => {
    try {
      await api.delete(`/shops/${shopId}`);
      toast.success("Shop deleted successfully");
      onShopUpdated();
    } catch (error) {
      console.error("Failed to delete shop:", error);
      toast.error("Error deleting shop");
    }
  };

  const handleEdit = (shop) => {
    setCurrentShop(shop);
    setEditModal(true);
  };

  const handleUpdateShop = async (updatedShop) => {
    try {
      await api.put(`/shops/${updatedShop._id}`, updatedShop);
      toast.success("Shop updated successfully");
      onShopUpdated(); // Trigger reload after update
      setEditModal(false); // Close modal
    } catch (error) {
      console.error("Failed to update shop:", error);
      toast.error("Error updating shop");
    }
  };

  if (!auth.isAuthenticated) {
    return <p>You need to be authenticated to view shop details</p>;
  }

  if (loading) {
    return <p>Loading shops...</p>;
  }

  if (shops.length === 0) {
    return <p>No shops available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="mx-auto my-2 border-spacing-1">
        <Table.Head>
          <Table.HeadCell>Shop Name</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Shop Number</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {shops.map((shop) => (
            <Table.Row
              className="border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              key={shop._id}
            >
              <Table.Cell className="font-bold text-gray-700">
                {shop.shopName}
              </Table.Cell>
              <Table.Cell>{shop.location}</Table.Cell>
              <Table.Cell>{shop.shopNo}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    gradientDuoTone="greenToBlue"
                    onClick={() => handleEdit(shop)}
                    className={clsx("some-button", {
                      "active-class": editModal,
                    })}
                  >
                    <FaEdit className="mr-2 h-5 w-5" />
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    color="failure"
                    onClick={() => handleDelete(shop._id)}
                  >
                    <MdDelete className="mr-2 h-5 w-5" />
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Edit Modal */}
      {/* Edit Modal */}
      {editModal && currentShop && (
        <Modal show={editModal} onClose={() => setEditModal(false)}>
          <Modal.Header>Edit Shop Details</Modal.Header>
          <Modal.Body>
            <EditShopFormComponent
              shop={currentShop}
              onSubmit={handleUpdateShop}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

function EditShopFormComponent({ shop, onSubmit }) {
  const [formData, setFormData] = useState({
    shopName: shop.shopName,
    location: shop.location,
    shopNo: shop.shopNo,
  });

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...shop, ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2 block">
        <Label htmlFor="shop name" value="Shop Name" />
        <TextInput
          id="shopName"
          name="shopName"
          type="text"
          value={formData.shopName}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-2 block">
        <Label htmlFor="location" value="Location" />
        <TextInput
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-2 block">
        <Label htmlFor="shopNo" value="Shop Number" />
        <TextInput
          id="shopNo"
          name="shopNo"
          type="text"
          value={formData.shopNo}
          onChange={onChange}
          required
        />
      </div>

      <Button type="submit" className="mt-4">
        Update Shop
      </Button>
    </form>
  );
}
