// components/ShareRoomSection.tsx
import { useState } from "react";
import { FaLink, FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShareRoomSection({ roomId }) {
  // const link = `${window?.location?.host}/room/${roomId}`;
  const link = `http://localhost:3000/room/${roomId}`;
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="px-4 py-2 mt-3 space-x-2 rounded bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-5 text-gray-200">
          {/* <FaLink className="mr-2" />
          Room Link:  */}
          {link}
        </div>
        <hr />
        <button
          onClick={copyToClipboard}
          className="flex items-center text-white transition duration-200 hover:text-blue-400"
        >
          <FaCopy className="mr-1 text-gray-200" />
          Copy
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
    </div>
  );
}
