import { useUser } from '../../../Providers/AuthProvider'
import classes from './chatWindow.module.css'
import socketService from '../../../services/socketService'
import { useEffect, useState } from 'react'
import apiService from '../../../services/apiService'
import { Message } from '../../../types/types'
import MessageComponent from '../message/Message'

interface ChatWindowProps {
  chatInfo: {
    receiver_id: string
    name: string
    chatImg?: string
  }
}


const ChatWindow: React.FC<ChatWindowProps> = ({ chatInfo }) => {
  const { user } = useUser()

  if (!user) return null
  const myUserId = user.user_id;
  const receiverId = chatInfo.receiver_id;
  const [oldMessages, setOldMessages] = useState<Message[]>([])
  const [content, setContent] = useState<string>("")
  const chatId = `${myUserId}-${receiverId}`


  const senderMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socketService.sendPrivateMessage(myUserId, receiverId, content)
    setOldMessages((prevMessages) => [
      ...prevMessages,
      {
        message_id: Math.random().toString(36).substring(2, 15), // Generate a random message ID
        sender_id: myUserId,
        receiver_id: receiverId,
        content: content,
        sent_at: new Date().toISOString(),
      },
    ]);
    setContent("")
  }

  const getMessages = async () => {
    const response = await apiService.get<Message[]>(
      `/api/messages/${myUserId}/${receiverId}`,
    );
    if (!response.data) {
      console.log("No messages found")
      setOldMessages([])
    } else {
      setOldMessages(response.data)
    }
  }

  function scrollChatWindowToBottom(chatId: string) {
    const chatWindow = document.getElementById(chatId);
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }


    useEffect(() => {
    socketService.on('new_message', (message: Message) => {
      if(message.sender_id === receiverId){
        console.log(message);
        setOldMessages((prevMessages) => [...prevMessages, message]);
      }
      
    });

    // return () => {
    //   socketService.off('new_message');
    //   socketService.disconnect();
    // };
  }, []);


  useEffect(() => {
    getMessages()
  }, [])

  useEffect(()=>{
    scrollChatWindowToBottom(chatId)
  },[oldMessages])

  return (
    <div className={classes.mainChatWindow}>
      <div className={classes.chatHeader}>{chatInfo.name}</div>
      <div id={chatId} className={classes.chatContent}>
        {
          oldMessages.map((message) => {
            return (
              <MessageComponent key={message.message_id} isMe={message.sender_id === myUserId} username={message.sender_id === myUserId ? user.username : chatInfo.name} content={message.content} sentOn={message.sent_at}/>
            )
          })
        }
      </div>
      <form onSubmit={(e)=>senderMessage(e)} className={classes.chatInput}>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type a message..." className={classes.inputField} />
        <button type='submit' className={classes.sendButton}>Send</button>
      </form>
    </div>
  )
}

export default ChatWindow
