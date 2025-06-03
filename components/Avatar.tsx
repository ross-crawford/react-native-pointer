import { Models } from 'react-native-appwrite';
import { Avatar } from 'react-native-paper';

type UserAvatarProps = {
  user: Models.User<Models.Preferences>;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  return <Avatar.Text size={24} label="XD" />;
};

export default UserAvatar;
