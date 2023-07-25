import { useState } from "react";
import { FaLink, FaCopy, FaQrcode } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import QRCode from "qrcode.react";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

// Modal.setAppElement("#root"); // set the root element for the modal. This would be the id of your root element

export default function ShareRoomSection({ roomId }) {
  const link = `http://localhost:3000/room/${roomId}`;
  const [isCopied, setIsCopied] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false); // State to handle the modal visibility

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
    toast.success("Copied to clipboard");
  };

  const openModal = () => setIsOpen(true); // Function to open the modal

  const closeModal = () => setIsOpen(false); // Function to close the modal

  return (
    <div className="px-4 py-2 mt-3 space-x-2 rounded bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-5 text-gray-200">{link}</div>
        <hr />
        <button
          onClick={copyToClipboard}
          className="flex items-center text-white transition duration-200 hover:text-blue-400"
        >
          <FaCopy className="mr-1 text-gray-200" />
          Copy
        </button>
        {/* <button
          onClick={openModal}
          className="flex items-center text-white transition duration-200 hover:text-blue-400 ml-3"
        >
          <FaQrcode className="mr-1 text-gray-200" />
          Show QR Code
        </button> */}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="QR Code Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal}>Close</button>
        <QRCode value={link} size={256} />
      </Modal>
    </div>
  );
}
