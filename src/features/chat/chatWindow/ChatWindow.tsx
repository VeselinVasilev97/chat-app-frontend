import classes from './chatWindow.module.css'

const ChatWindow = () => {

  return (
    <div className={classes.mainChatWindow}>
      <div className={classes.chatHeader}>Dido95</div>
      <div className={classes.chatContent}>

        <div className={classes.senderChat}>
          <div className={classes.chatUsername}>Dus7 <img className={classes.memberImage} /></div>
          <p className={classes.senderMessage}>Hi, how are you my Friend,can you help me with something I need more text to test my chat bubbles. are they working okay. ???</p>
        </div>
        <div className={classes.receiverChat}>
          <label className={classes.chatUsername}><img className={classes.memberImage} />Dido95</label>
          <p className={classes.receiverMessage}>Hey I'm good what about you how
            are you doing?</p>
        </div>

      </div>
      <div className={classes.chatInput}>
        <input type="text" placeholder="Type a message..." className={classes.inputField} />
        <button className={classes.sendButton}>Send</button>
      </div>
    </div>
  )
}

export default ChatWindow
