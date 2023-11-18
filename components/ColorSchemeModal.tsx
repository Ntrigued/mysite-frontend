import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function ColorSchemeModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const customStyles = {
    content: {
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div
      className="cursor-pointer"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      <p>Customize UI</p>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}
