import React from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FAUserIcon, UserProfileImg } from 'elements/UserIcon/style';
import { UserIconProps } from 'elements/UserIcon/types';

const UserIcon: React.FC<UserIconProps> = ({
    picture,
    size,
}: UserIconProps) => {
    return picture ? (
        <UserProfileImg src={picture} className='rounded-circle' size={size} />
    ) : (
        <FAUserIcon icon={faUserCircle} title='nice' siz={size} />
    );
};

export default UserIcon;
