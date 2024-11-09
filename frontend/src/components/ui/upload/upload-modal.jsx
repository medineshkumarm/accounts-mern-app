import React, { useState } from "react";
import api from "../../../api/api";

const ExcelUploadForm = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePreview = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);
    setLoading(true);

    try {
      const response = await api.post("/previewExcel", formData);
      setPreviewData(response.data.data);
    } catch (error) {
      console.error("Error previewing file:", error);
      alert("Failed to preview the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);
    setLoading(true);

    try {
      await api.post("/uploadExcel", formData);
      alert("File uploaded successfully!");
      setFile(null);
      setPreviewData(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!previewData || !previewData.length) return null;

    const headers = Object.keys(previewData[0]);

    return (
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {previewData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border-b">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upload Excel File
      </h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xlsx"
        className="block w-full text-sm p-2 border border-gray-300 rounded mb-4"
      />

      <button
        onClick={handlePreview}
        className="bg-blue-500 text-white w-full py-2 rounded-lg mb-4 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Preview Data"}
      </button>

      {previewData && (
        <div className="max-h-40 overflow-auto mb-4 bg-gray-100 p-2 rounded border border-gray-200">
          {renderTable()}
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default ExcelUploadForm;
