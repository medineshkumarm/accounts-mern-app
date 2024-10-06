import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { Label, TextInput, Button, HR, Table } from "flowbite-react";
import { AuthContext } from "../../context/auth-context";

const SettingsPage = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      {/* <div className="flex flex-col justify-center py-5 items-center lg:max-w-2xl lg:p-2"> */}
      <div className=" lg:p-2 md:flex md:flex-col md:py-5 ">
        <div className="space-y-2 p-4">
          <h1 className="pb-4 font-bold text-md">User details</h1>
          <div>
            <div className="md-2 block space-y-2 ">
              <Label htmlFor="username" value="username" />

              <TextInput
                type="text"
                value={auth.user.username || "username"}
                rightIcon={HiMail}
                disabled
              />
            </div>
          </div>

          <div>
            <div className="md-2 block space-y-2">
              <Label htmlFor="email" value="email" />
              <TextInput
                type="email"
                rightIcon={HiMail}
                value={auth.user.email || "name@example.com"}
                disabled
              />
            </div>
          </div>

          <div className=" ">
            <div>
              <Label htmlFor="password" value="password" />
            </div>

            <div className="flex space-x-3">
              <TextInput
                className="flex-1"
                type="password"
                rightIcon={RiLockPasswordLine}
                value={auth.user.password || "random-passsword"}
                disabled
              />
              <Button size="sm" gradientDuoTone="greenToBlue">
                change password
              </Button>
            </div>
            {/* themes */}
            <div>
              <div className="md-2 block space-y-2">
                <Label htmlFor="them" value="theme" />
                <TextInput
                  type="text"
                  rightIcon={IoIosColorPalette}
                  value={"blue"}
                  disabled
                />
              </div>
            </div>
            {/* profile pic */}
            <HR />
            <div>
              <h1 className="my-0 mt-2 font-bold text-md">
                Upload Profile Picture
              </h1>
              <FileUplodComponent />
            </div>
          </div>
        </div>

        {/* <HR /> */}
        {/* <div className="ml-5 space-y-2 mb-2"> */}
        <div>
          {/* <h1 className="px-5 font-bold text-md">Shop details</h1> */}
          {/* <ShopTableComponent /> */}
          <Button size="sm" color="success" className="m-5 ">
            Save Changes
          </Button>
        </div>
        <HR />
      </div>
    </>
  );
};

export default SettingsPage;

import { FileInput } from "flowbite-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useContext } from "react";
export function FileUplodComponent() {
  return (
    <div className="flex items-center justify-center py-5">
      <Label
        htmlFor="dropzone-file"
        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <IoCloudUploadOutline className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <FileInput id="dropzone-file" className="hidden" />
      </Label>
    </div>
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
