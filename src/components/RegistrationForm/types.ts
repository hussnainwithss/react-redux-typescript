import { connector } from 'components/RegistrationForm';
import { ConnectedProps } from 'react-redux';
import { History } from 'history';

type PropsFromRedux = ConnectedProps<typeof connector>;
export interface Props extends PropsFromRedux {
    history: History;
}

export type FormValues = {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    birthday: string;
    gender: string;
};
