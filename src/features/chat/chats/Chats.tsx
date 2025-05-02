import { useChatContext } from '../../../contexts/chat/ChatContext'
import ChatWindow from '../chatWindow/ChatWindow'
import classes from './Chats.module.css'



const Chats = () => {
  const { chats, activeChats, handleActiveChat } = useChatContext()

  
  if (chats.length === 0) return null
  return (
    <div className={classes.chatsNavBar}>
      {
        chats.map((chat) => (
          <div className={classes.singleChat} key={chat.receiver_id}>
            <button onClick={() => handleActiveChat(chat.receiver_id)} className={classes.chatButton}>
              {chat.chatImg ? <img height={"100%"} src={chat.chatImg} /> : <p className={classes.chatNoImageText}>{chat.name}</p>}
            </button>
          </div>
        ))
      }
      <div className={classes.activeChats}>
        {activeChats.map((chatId) => {
          const chat = chats.find(chat => chat.receiver_id === chatId)
          return chat ? <ChatWindow key={chat.receiver_id} chatInfo={chat} /> : null
        })}
      </div>
    </div>
  )
}

export default Chats