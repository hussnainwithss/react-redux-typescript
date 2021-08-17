import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Form } from 'react-bootstrap';

interface IProps {
    label?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectField = (props: IProps & FieldHookConfig<string>) => {
    const [field, meta] = useField(props);
    console.log('props', props);
    console.log('meta', meta);
    console.log('field', field);
    return (
        <Form.Group
            controlId={props.id || props.name}
            className={props.className}
        >
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                as='select'
                {...field}
                name={props.name}
                value={props.value}
                className={meta.touched && meta.error ? 'field-error' : ''}
            >
                {props.children}
            </Form.Control>
            {meta.touched && meta.error ? (
                <Form.Text className='text-danger'>{meta.error}</Form.Text>
            ) : null}
        </Form.Group>
    );
};

export default SelectField;
