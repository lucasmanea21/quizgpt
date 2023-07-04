import * as React from "react";

const FileUpload = ({ onFileSelect }) => {
  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          onFileSelect(e.dataTransfer.items[i].getAsFile());
        }
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center h-48 text-gray-600 border-4 border-gray-600 border-dashed rounded-lg"
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
    >
      <label className="cursor-pointer">
        <span>Drag and drop your file here, or</span>
        <input type="file" className="hidden" onChange={handleFileInput} />
        <span className="text-blue-600 hover:underline">Browse</span>
      </label>
    </div>
  );
};

export default FileUpload;
