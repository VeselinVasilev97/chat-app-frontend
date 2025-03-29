import classes from "./FriendButton.module.css"
const FriendButton = ({ email, username, isOnline }: { email: string, username: string, isOnline:boolean }) => {
    return <button  className={classes.friendBtn} key={email}>
        <div style={{backgroundColor:isOnline ? "green" : "red"}} className={classes.status}></div>
        {username}</button>
}

export default FriendButton