import { useUser } from '../../../Providers/AuthProvider'
import classes from './chatWindow.module.css'
import socketService from '../../../services/socketService'
import { useEffect, useState } from 'react'
import apiService from '../../../services/apiService'
import { Message } from '../../../types/types'

interface ChatWindowProps {
  chatInfo: {
    chatImg: string
    receiver_id: string
    name: string
  }
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatInfo }) => {
  const {user} = useUser()
  
  if(!user) return null
  const senderId = user.user_id;
  const receiverId = chatInfo.receiver_id;
  const [oldMessages, setOldMessages] = useState<Message[]>([])
  const [content, setContent] = useState<string>("")

  
  const senderMessage = () => {
    socketService.sendPrivateMessage(senderId, receiverId, content)
  }
    const getMessages = async () => {
        const response = await apiService.get<Message[]>(
          `/api/messages/${senderId}/${receiverId}`,
        );
        if(!response.data){
          console.log("No messages found")
          setOldMessages([])
        }else{
          const reversedMessages = response.data.reverse()
          setOldMessages(reversedMessages)
        }
    }
    console.log(chatInfo);
    

  useEffect(() =>{
    getMessages()
},[])
  return (
    <div className={classes.mainChatWindow}>
      <div className={classes.chatHeader}>{chatInfo.name}</div>
      <div className={classes.chatContent}>
        {
          oldMessages.map((message,i) => {
            if (message.sender_id === senderId) {
              return (
                <div key={i} className={classes.senderChat}>
                  <div className={classes.chatUsername}>{user.username} <img className={classes.memberImage} /></div>
                  <p className={classes.senderMessage}>{message.content}</p>
                </div>
              )
            } else {
              return (
                <div key={i} className={classes.receiverChat}>
                  <label className={classes.chatUsername}><img className={classes.memberImage} />{chatInfo.name}</label>
                  <p className={classes.receiverMessage}>{message.content}</p>
                </div>
              )
            }
          })
        }
        {/* <div className={classes.senderChat}>
          <div className={classes.chatUsername}>Dus7 <img className={classes.memberImage} /></div>
          <p className={classes.senderMessage}>Hi, how are you my Friend,can you help me with something I need more text to test my chat bubbles. are they working okay. ???</p>
        </div>
        <div className={classes.receiverChat}>
          <label className={classes.chatUsername}><img className={classes.memberImage} />Dido95</label>
          <p className={classes.receiverMessage}>Hey I'm good what about you how
            are you doing?</p>
        </div> */}
        
      </div>
      <div className={classes.chatInput}>
        <input type="text" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Type a message..." className={classes.inputField} />
        <button onClick={senderMessage} className={classes.sendButton}>Send</button>
      </div>
    </div>
  )
}

export default ChatWindow
