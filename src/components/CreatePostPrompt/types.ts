import { ConnectedProps } from 'react-redux';
import { connector } from 'components/CreatePostPrompt';
import { Dispatch } from 'react';
import { Status } from 'pages/Dashboard/types';

type PropsFromRedux = ConnectedProps<typeof connector>;

export type FormValues = {
    content: string;
    image: null | File;
};

export interface Props extends PropsFromRedux {
    setPostStatus: Dispatch<Status>;
    setShowAlert: Dispatch<boolean>;
}
