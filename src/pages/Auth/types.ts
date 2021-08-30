import { connector } from 'pages/Auth/ChangePassword';
import { ConnectedProps } from 'react-redux';

type PropsFromRedux = ConnectedProps<typeof connector>;

export type FormValues = {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
};

export type Props = PropsFromRedux;
