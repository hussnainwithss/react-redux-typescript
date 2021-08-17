import React from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FAUserIcon, UserProfileImg } from 'elements/UserIcon/style';

const UserIcon = ({ picture, size }: { picture: string; size: string }) => {
    return picture ? (
        <UserProfileImg src={picture} className='rounded-circle' size={size} />
    ) : (
        <FAUserIcon icon={faUserCircle} title='nice' siz={size} />
    );
};

export default UserIcon;
