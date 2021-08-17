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
const TextField = (props: IProps & FieldHookConfig<string>) => {
    const [field, meta] = useField(props);
    return (
        <Form.Group
            controlId={props.id || props.name}
            className={props.className}
        >
            {props.label ? (
                <Form.Label className='mb-0'>{props.label}</Form.Label>
            ) : (
                ''
            )}
            <Form.Control
                {...field}
                className={meta.touched && meta.error ? 'field-error' : ''}
                placeholder={props.placeholder}
                max={props.max}
                type={props.type}
            />
            {console.log(props)}
            {meta.touched && meta.error ? (
                <Form.Text className={props.errorClassName}>
                    {meta.error}
                </Form.Text>
            ) : null}
            {props.bottomText ? (
                <Form.Text className='mt-0'>{props.bottomText}</Form.Text>
            ) : (
                ''
            )}
        </Form.Group>
    );
};

export default TextField;
