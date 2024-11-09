import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Label, TextInput, Button, FileInput, HR } from "flowbite-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AuthContext } from "../../context/auth-context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview URL
  const [isDragOver, setIsDragOver] = useState(false); // For drag styling

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    updateFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) updateFile(droppedFile);
  };

  const updateFile = (selectedFile) => {
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await api.post("/users/uploadProfilePicture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);

      URL.revokeObjectURL(previewUrl); // Cleanup URL after upload
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <>
      <div className="lg:p-2 md:flex md:flex-col md:py-5">
        <div className="space-y-2 p-4">
          <h1 className="pb-4 font-bold text-md">User details</h1>
          <div className="md-2 block space-y-2">
            <Label htmlFor="username" value="username" />
            <TextInput
              type="text"
              value={auth.user.username || "username"}
              rightIcon={HiMail}
              disabled
            />
          </div>

          <div className="md-2 block space-y-2">
            <Label htmlFor="email" value="email" />
            <TextInput
              type="email"
              rightIcon={HiMail}
              value={auth.user.email || "name@example.com"}
              disabled
            />
          </div>

          <div className="space-x-3 md-2 space-y-2 block">
            <Label htmlFor="password" value="password" />
            <TextInput
              className="flex-1"
              type="password"
              rightIcon={RiLockPasswordLine}
              value={auth.user.password || "random-passsword"}
              disabled
            />
            <Button size="sm" gradientDuoTone="greenToBlue">
              Change Password
            </Button>
          </div>

          {/* Upload profile picture */}
          <HR />
          <h1 className="my-0 mt-2 font-bold text-md">Upload Profile Picture</h1>
          <div className="flex flex-col items-center justify-center py-5 space-y-4">
            <Label
              htmlFor="profilePicture"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed 
                ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"} 
                hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
            >
              {/* Display the preview image if available */}
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <IoCloudUploadOutline className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <FileInput
                id="profilePicture"
                onChange={handleFileChange}
                className="hidden"
              />
            </Label>

            <Button
              onClick={handleUpload}
              size="sm"
              className="m-5"
              gradientDuoTone="greenToBlue"
            >
              Upload Profile Picture
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
