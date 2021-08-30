import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Form } from 'react-bootstrap';

interface IProps {
    label?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectField: React.FC<IProps & FieldHookConfig<string>> = (props) => {
    const [field, meta] = useField(props);
    const { id, name, className, label, value, children } = props;
    const { error, touched } = meta;
    return (
        <Form.Group controlId={id || name} className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as='select'
                {...field}
                name={name}
                value={value}
                className={touched && error ? 'field-error' : ''}
            >
                {children}
            </Form.Control>
            {touched && error ? (
                <Form.Text className='text-danger'>{error}</Form.Text>
            ) : null}
        </Form.Group>
    );
};

export default SelectField;
