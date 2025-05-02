import { useUser } from '../../../Providers/AuthProvider'
import classes from './chatWindow.module.css'
import socketService from '../../../services/socketService'
import { useState } from 'react'

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
  const [content, setContent] = useState<string>("")

  
  const senderMessage = () => {
    socketService.sendPrivateMessage(senderId, receiverId, content)
  }
  

  return (
    <div className={classes.mainChatWindow}>
      <div className={classes.chatHeader}>{chatInfo.name}</div>
      <div className={classes.chatContent}>

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
