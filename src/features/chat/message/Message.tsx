import classes from './Message.module.css';
interface MessageComponentProps {
    username: string;
    content: string;
    isMe: boolean;
    sentOn: string;
}

const MessageComponent = ({ isMe, username, content, sentOn }: MessageComponentProps) => {


    return (
        <div className={isMe ? classes.senderChat : classes.receiverChat}>
            <label className={username === "Dus7" ? classes.adminColor : classes.chatUsername}><img className={classes.memberImage} />{username}</label>
            <p className={isMe ? classes.senderMessage : classes.receiverMessage}>{content}</p>
            <label className={classes.sentOn}>{sentOn}</label>
        </div>
    )
}

export default MessageComponent