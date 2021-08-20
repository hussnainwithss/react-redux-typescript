import { connector } from 'components/Header';
import { History } from 'history';
import { ConnectedProps } from 'react-redux';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface Props extends PropsFromRedux {
    history: History;
}
