import React from "react";
import "./Modal.css";
import { useGlobalContext } from "../Context/TaskContext";
const Modal = () => {
  const { openModal, closeModal } = useGlobalContext();

  return (
    <div className="modal-container">
      <p>Are You sure want to clear Tasks ?</p>
      <div className="modal-buttons-container ">
        <button onClick={openModal} className="modal-button confirm">
          Confirm
        </button>
        <button onClick={closeModal} className="modal-button cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
