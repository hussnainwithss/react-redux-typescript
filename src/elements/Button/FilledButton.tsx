import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { ButtonProps } from 'elements/Button/types';

const FilledButton: React.FC<ButtonProps> = ({
    children,
    variant,
    type,
    disabled,
    onClick,
}: ButtonProps) => {
    return (
        <Button
            variant={variant}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default memo(FilledButton);
