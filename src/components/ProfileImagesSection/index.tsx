import React from 'react';
import { ImagesSection } from 'components/ProfileImagesSection/style';
import UserCoverPicture from 'components/UserCoverPicture';
import UserProfilePicture from 'components/UserProfilePicture';

const ProfileImagesSection = ({
    user,
    allowEdit,
}: {
    user: any;
    allowEdit: boolean;
}) => {
    return (
        <ImagesSection>
            <UserCoverPicture user={user} allowEdit={allowEdit} />
            <UserProfilePicture
                picture={user.profile.profile_picture}
                user={user}
                allowEdit={allowEdit}
            />
        </ImagesSection>
    );
};

export default ProfileImagesSection;
