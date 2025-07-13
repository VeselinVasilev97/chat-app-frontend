import { createContext, useContext } from "react";

export type Chat = {
  receiver_id: string;
  name: string;
  chatImg?: string;
};

export type ChatContextType = {
  chats: Chat[];
  addChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
  activeChats: string[];
  handleActiveChat: (id: string) => void;
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};