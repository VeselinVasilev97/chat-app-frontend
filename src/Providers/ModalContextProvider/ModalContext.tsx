import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import Modal from "../../components/Modal/Modal";

interface ModalContextType {
  showModal: (message: string, type?: "success" | "error" | "info") => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showModal = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setModal({ message, type });
    setTimeout(() => setModal(null), 3000); // Auto-hide after 3 seconds
  }, []);

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modal && <Modal message={modal.message} type={modal.type} onClose={() => setModal(null)} />}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal anywhere
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
