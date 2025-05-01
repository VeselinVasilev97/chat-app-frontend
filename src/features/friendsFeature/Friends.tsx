import FriendButton from './friendsButton/FriendButton';
import { Friend } from './types';

type FriendsProps = {
    friends: Friend[];
};

const Friends: React.FC<FriendsProps> = ({ friends }) => {
    return (
        friends.map((friend) => (
            <FriendButton key={friend.email} friend={friend} />
        ))
    )
}

export default Friends