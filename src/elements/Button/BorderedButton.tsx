import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

const BorderedButton = ({ children, ...rest }: { children: React.FC<any> }) => {
    return (
        <Button variant='outline-dark' {...rest}>
            {children}
        </Button>
    );
};

export default memo(BorderedButton);
