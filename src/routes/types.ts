import React from 'react';

export interface PATH {
    path: string;
    name: string;
    component: React.FC<any>;
    isPublic?: boolean;
}

export interface Props {
    routes: Record<string, PATH>;
    defaultPath: string;
}

export interface PrivatePublicRouteProps {
    isAuthenticated?: boolean;
    component: React.FC<any>;
    exact?: boolean;
    path: string;
    props?: any;
}
