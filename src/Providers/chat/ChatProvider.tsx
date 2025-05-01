import React, { useState } from "react";
import { Chat, ChatContext, ChatContextType } from "../../contexts/chat/ChatContext";

type Props = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChats, setActiveChats] = useState<string[]>([]);

  const addChat = (chat: Chat) => {
    setChats(prev =>
      prev.some(c => c.receiver_id === chat.receiver_id) ? prev : [...prev, chat]
    );
  };
  const removeChat = (id: string) => {
    setChats(prev => prev.filter(chat => chat.receiver_id !== id));
  };
  const handleActiveChat = (id: string) => {
    setActiveChats(prev => {
      if (prev.includes(id)) {
        return prev.filter(chatId => chatId !== id);
      } else {
        return [...prev, id];
      }
    })
  }
  
    const value: ChatContextType = {
    chats,
    addChat,
    removeChat,
    activeChats,
    handleActiveChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
