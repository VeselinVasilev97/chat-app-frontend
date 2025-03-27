import { useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.modalContent} ${styles[type]}`}>
      {message}
      </div>
    </div>
  );
};

export default Modal;
