import { ConnectedProps } from 'react-redux';
import { connector } from 'components/UserProfilePicture';
import { User } from 'components/ProfileImagesSection/types';

export interface ProfilePictureProps {
    picture: string;
}
type PropsFromRedux = ConnectedProps<typeof connector>;

export interface UserProfilePictureProps extends PropsFromRedux {
    user: User;
    allowEdit: boolean;
}

export type FormValues = {
    profile_picture: File | null;
};
