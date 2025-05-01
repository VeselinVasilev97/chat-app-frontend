import { useChatContext } from '../../../contexts/chat/ChatContext'
import classes from './Chats.module.css'
const Chats = () => {
  const { chats } = useChatContext()

  if (chats.length === 0) return null
  return (
    <div className={classes.chatsNavBar}>
      {
        chats.map((chat) => (
          <div className={classes.singleChat} key={chat.id}>
            <button onClick={() => console.log(`open chat: ${chat.id}`)} className={classes.chatButton}>
              <img height={"100%"} src={chat.chatImg} />
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default Chats