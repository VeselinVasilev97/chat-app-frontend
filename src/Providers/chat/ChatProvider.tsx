import React, { useState } from "react";
import { Chat, ChatContext, ChatContextType } from "../../contexts/chat/ChatContext";

type Props = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const addChat = (chat: Chat) => {
    setChats(prev =>
      prev.some(c => c.id === chat.id) ? prev : [...prev, chat]
    );
  };

  const removeChat = (id: string) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
  };

  const value: ChatContextType = {
    chats,
    addChat,
    removeChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
