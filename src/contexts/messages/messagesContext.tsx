import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Message } from '../../types/types';

type MessageContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};
const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {},
});
export const useMessages = () => useContext(MessageContext);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);



  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};