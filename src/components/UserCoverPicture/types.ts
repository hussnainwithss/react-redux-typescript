import { User } from 'components/ProfileImagesSection/types';
import { ConnectedProps } from 'react-redux';
import { connector } from 'components/UserCoverPicture';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface UserCoverPictureProps extends PropsFromRedux {
    user: User;
    allowEdit: boolean;
}
export interface CoverPictureProps {
    picture: string;
}

export type FormValues = {
    cover_picture: File | null;
};
