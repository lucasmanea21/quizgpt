import * as React from "react";

const FileUpload = ({ onFileSelect }) => {
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
      setSelectedFiles([file]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      const files = [];
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          const file = e.dataTransfer.items[i].getAsFile();
          files.push(file);
        }
      }
      onFileSelect(files[0]);
      setSelectedFiles(files);
    }
  };

  // Function to check if the file has allowed extensions
  const isFileAllowed = (file) => {
    const allowedExtensions = ["pdf", "txt", "md"];
    const fileExtension = file.name.split(".").pop();
    return allowedExtensions.includes(fileExtension.toLowerCase());
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-48 mb-5 text-gray-600 border-4 border-gray-600 border-dashed rounded-lg"
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
    >
      <label className="cursor-pointer">
        <span>Drag and drop your file here, or </span>
        <input type="file" className="hidden" onChange={handleFileInput} />
        <span className="text-blue-600 hover:underline">Browse</span>
      </label>

      {/* Display selected file names */}
      {selectedFiles.length > 0 && (
        <div className="mt-3">
          <h2 className="text-lg font-medium">Selected Files:</h2>
          <ul className="list-disc list-inside">
            {selectedFiles.map((file, index) => (
              <li key={index} className="mt-1">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error message for invalid file types */}
      {selectedFiles.length > 0 && !isFileAllowed(selectedFiles[0]) && (
        <p className="mt-2 text-red-600">
          Only PDF, txt, and md files are allowed.
        </p>
      )}
    </div>
  );
};

export default FileUpload;
