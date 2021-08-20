import { connector } from 'pages/Dashboard';
import { ConnectedProps } from 'react-redux';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface Status {
    type: string;
    message: string;
}

export type Props = PropsFromRedux;
