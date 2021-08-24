import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Form } from 'react-bootstrap';

interface IProps {
    errorClassName?: string;
    bottomText?: any;
    label?: string;
    max?: string;
    as?: string;
}
const TextField: React.FC<IProps & FieldHookConfig<string>> = (props) => {
    const [field, meta] = useField(props);
    const { error, touched } = meta;
    const {
        id,
        label,
        bottomText,
        max,
        errorClassName,
        name,
        className,
        placeholder,
        type,
    } = props;
    return (
        <Form.Group controlId={id || name} className={className}>
            {label ? <Form.Label className='mb-0'>{label}</Form.Label> : ''}
            <Form.Control
                {...field}
                className={touched && error ? 'field-error' : ''}
                placeholder={placeholder}
                max={max}
                type={type}
            />
            {touched && error ? (
                <Form.Text className={errorClassName}>{error}</Form.Text>
            ) : null}
            {bottomText ? (
                <Form.Text className='mt-0'>{bottomText}</Form.Text>
            ) : (
                ''
            )}
        </Form.Group>
    );
};

export default TextField;
