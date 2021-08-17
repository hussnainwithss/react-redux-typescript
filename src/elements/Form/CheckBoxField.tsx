import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Form } from 'react-bootstrap';

interface IProps {
    children: string;
}
const CheckBoxField = (props: IProps & FieldHookConfig<string>) => {
    const [field, meta] = useField(props);
    return (
        <Form.Group
            controlId={props.id || props?.name}
            className={props.className}
        >
            <Form.Check {...field} label={props.children} />
            {meta.touched && meta.error ? (
                <Form.Text className='text-danger'>{meta.error}</Form.Text>
            ) : null}
        </Form.Group>
    );
};

export default CheckBoxField;
