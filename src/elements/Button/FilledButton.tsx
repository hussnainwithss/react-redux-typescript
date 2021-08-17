import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

const FilledButton = ({
    children,
    variant,
    type,
    disabled,
    onClick,
    ...rest
}: {
    children: any;
    variant: string;
    type?: string;
    disabled: boolean;
    onClick?: any;
}) => {
    return (
        <Button
            variant={variant}
            type={type}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default memo(FilledButton);
