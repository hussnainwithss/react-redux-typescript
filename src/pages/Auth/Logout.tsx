import React, { useEffect } from 'react';
import { AppRoutes } from 'routes';
import { deleteUserToken } from 'utils/user';

const Logout: React.FC = () => {
    useEffect(() => {
        deleteUserToken();
        window.location.replace(AppRoutes.LOGIN.path);
    }, []);
    return <></>;
};

export default Logout;
