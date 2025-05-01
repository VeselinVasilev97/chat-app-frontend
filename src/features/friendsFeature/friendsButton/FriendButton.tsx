import { useChatContext } from "../../../contexts/chat/ChatContext";
import { Friend } from "../types"
import classes from "./FriendButton.module.css"

type FriendButtonProps = {
    friend: Friend;
};

const FriendButton: React.FC<FriendButtonProps> = ({ friend }) => {
    const { addChat } = useChatContext();
        
    const handleAddChat = () => {
        const chat = {
            id: friend.email,
            name: friend.username,
            chatImg: friend.profile_picture_url,
        };
        addChat(chat)
    };
    return (
        <button onClick={handleAddChat} className={classes.friendBtn}>
            <div style={{ backgroundColor: friend.isOnline ? "green" : "red" }} className={classes.status}></div>
            {friend.username}
        </button>
    )
}

export default FriendButton