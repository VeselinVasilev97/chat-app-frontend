import FriendButton from './friendsButton/FriendButton';
type Friend = {
    email: string;
    isOnline: boolean;
    user_id: string;
    username: string;
}
type FriendsProps = {
    friends: Friend[];
};

const Friends: React.FC<FriendsProps> = ({ friends }) => {

    return (
        friends.map(({ username, email, isOnline }) => (
            <FriendButton key={email} username={username} email={email} isOnline={isOnline} />
        ))
    )
}

export default Friends