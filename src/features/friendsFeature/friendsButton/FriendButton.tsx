import classes from "./FriendButton.module.css"
const FriendButton = ({ email, username }: { email: string, username: string }) => {
    return <button className={classes.friendBtn} key={email}>{username}</button>
}

export default FriendButton