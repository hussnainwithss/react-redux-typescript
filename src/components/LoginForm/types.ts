import { connector } from 'components/LoginForm';
import { History } from 'history';
import { ConnectedProps } from 'react-redux';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface Props extends PropsFromRedux {
    history: History;
}

export type FormValues = {
    username: string;
    password: string;
    remember_me: boolean;
};
