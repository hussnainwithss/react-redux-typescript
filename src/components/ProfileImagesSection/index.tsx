import React from 'react';
import { ImagesSection } from 'components/ProfileImagesSection/style';
import UserCoverPicture from 'components/UserCoverPicture';
import UserProfilePicture from 'components/UserProfilePicture';
import { Props } from 'components/ProfileImagesSection/types';

const ProfileImagesSection: React.FC<Props> = (props) => {
    const { user, allowEdit } = props;
    return (
        <ImagesSection>
            <UserCoverPicture user={user} allowEdit={allowEdit} />
            <UserProfilePicture user={user} allowEdit={allowEdit} />
        </ImagesSection>
    );
};

export default ProfileImagesSection;
