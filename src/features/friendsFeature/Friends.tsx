import useFriends from '../../hooks/users/useFriends'
import FriendButton from './friendsButton/FriendButton';

const Friends = () => {
    const { friends } = useFriends();

    return (
        friends.map(({ username, email }) => (
            <FriendButton key={email} username={username} email={email} />
        ))
    )
}

export default Friends