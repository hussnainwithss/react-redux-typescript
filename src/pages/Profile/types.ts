import { connector } from 'pages/Profile/UpdateProfile';
import { ConnectedProps } from 'react-redux';

export interface Post {
    content?: string;
    image: string | undefined;
    created_at: Date;
    feed_type: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;
export type Props = PropsFromRedux;

export type FormValues = {
    email?: string;
    first_name?: string;
    last_name?: string;
    profile: {
        education?: string;
        work?: string;
        hometown?: string;
        bio?: string;
        gender?: string;
        birthday?: string;
        relationship_status?: string;
    };
};
