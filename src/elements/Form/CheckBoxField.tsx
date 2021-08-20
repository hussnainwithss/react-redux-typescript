import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Form } from 'react-bootstrap';

interface IProps {
    children: string;
}
const CheckBoxField: React.FC<IProps & FieldHookConfig<string>> = (
    props: IProps & FieldHookConfig<string>
) => {
    const [field, meta] = useField(props);
    const { id, name, className, children } = props;
    const { touched, error } = meta;
    return (
        <Form.Group controlId={id || name} className={className}>
            <Form.Check {...field} label={children} />
            {touched && error ? (
                <Form.Text className='text-danger'>{error}</Form.Text>
            ) : null}
        </Form.Group>
    );
};

export default CheckBoxField;
