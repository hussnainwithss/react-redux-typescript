import { History, Location } from 'history';
import { match } from 'react-router';

export interface layoutProps {
    history: History;
    location: Location;
    match: match;
    type?: string;
    props?: any;
    key?: string;
}
