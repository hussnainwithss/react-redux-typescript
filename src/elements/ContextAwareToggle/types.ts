import { EventHandler } from 'react';

export interface ContextAwareToggleProps {
    callback?: EventHandler<any> | undefined;
    children: string;
    eventKey: string;
}
