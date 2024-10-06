import { Label, TextInput, Button, Table, HR } from "flowbite-react";
import { BsShop } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const ShopsPage = () => {
  return (
    <div>
      <div>
        <h1 className="font-bold py-2 text-xl">Add Shop Details</h1>
        <hr />
        <AddShopFormComponent />
      </div>
      <HR />

      <div>
        <h1 className="font-bold  px-2 mb-2  text-xl">All Shop Details</h1>
        <hr />

        <ShopTableComponent />
      </div>
    </div>
  );
};

export default ShopsPage;
export function AddShopFormComponent() {
  return (
    <form className="max-w-xl space-y-2 md:space-y-3">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="shop name" value="enter your shop name" />
        </div>
        <TextInput
          id="shop name"
          name="shopName"
          type="shop name"
          icon={BsShop}
          placeholder="enter shop number"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="location" value="enter your location" />
        </div>
        <TextInput
          id="location"
          type="location"
          icon={FaLocationDot}
          placeholder="enter location"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="shop number" value="enter your shop number" />
        </div>
        <TextInput
          id="shop number"
          type="shop number"
          icon={BsShop}
          placeholder="enter shop number"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        add shop details
      </button>
    </form>
  );
}

export function ShopTableComponent() {
  return (
    <div className="overflow-x-auto ">
      <Table className="mx-auto my-2 border-spacing-1 ">
        <Table.Head>
          <Table.HeadCell>ShopName</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Shop Number</Table.HeadCell>
          <Table.HeadCell>More</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className=" border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <Table.Cell className="font-bold text-gray-700">
              Tyre Shop
            </Table.Cell>
            <Table.Cell>Chennai</Table.Cell>
            <Table.Cell>001</Table.Cell>
            <Table.Cell>
              <Button size="sm" gradientDuoTone="greenToBlue">
                <FaEdit className="mr-2 h-5 w-5" />
                edit
              </Button>
            </Table.Cell>
          </Table.Row>
          {/* 2 */}
          <Table.Row className=" border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <Table.Cell className="font-bold text-gray-700">
              Tyre Shop
            </Table.Cell>
            <Table.Cell>Chennai</Table.Cell>
            <Table.Cell>001</Table.Cell>
            <Table.Cell>
              <Button size="sm" gradientDuoTone="greenToBlue">
                <FaEdit className="mr-2 h-5 w-5" />
                edit
              </Button>
            </Table.Cell>
          </Table.Row>
          {/* 3 */}
          <Table.Row className=" border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <Table.Cell className="font-bold text-gray-700">
              Tyre Shop
            </Table.Cell>
            <Table.Cell>Chennai</Table.Cell>
            <Table.Cell>001</Table.Cell>
            <Table.Cell>
              <Button size="sm" gradientDuoTone="greenToBlue">
                <FaEdit className="mr-2 h-5 w-5" />
                edit
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
