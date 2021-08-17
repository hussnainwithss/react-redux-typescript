import React from 'react';
import { connect } from 'react-redux';
import { Form as FormBS, Spinner } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { AxiosError, AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { TextField } from 'elements/Form';
import { FilledButton } from 'elements/Button';
import { authenticateUserAction } from 'pages/Auth/ducks/actions';
import { CheckBOXField, BottomLink } from 'components/LoginForm/style';
import { AppRoutes } from 'routes';

interface InitialValuesTypes {
    username: string;
    password: string;
    remember_me: boolean;
}
const LoginForm = ({
    authenticateUser,
    history,
}: {
    authenticateUser: any;
    history: any;
}) => {
    const initialValues: InitialValuesTypes = {
        username: '',
        password: '',
        remember_me: false,
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .max(50)
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string().max(30).required('Required'),
    });

    const handleSubmit = (
        values: InitialValuesTypes,
        {
            setStatus,
            setErrors,
            setSubmitting,
        }: { setStatus: any; setErrors: any; setSubmitting: any }
    ) => {
        const { username, password, remember_me } = values;
        authenticateUser(username, password, remember_me)
            .then((resp: AxiosResponse) => {
                if (resp) {
                    history.push(AppRoutes.DASHBOARD.path);
                    setSubmitting(false);
                }
            })
            .catch((error: AxiosError) => {
                history.push(AppRoutes.DASHBOARD.path);
                const fieldError = {};
                if (error && error.message) {
                    console.log(error.message);
                }
                if (error.response && error.response.data.non_field_errors) {
                    setStatus({
                        error: error.response.data.non_field_errors[0],
                    });
                }

                setErrors(fieldError);
                setSubmitting(false);
            });
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, status }) => (
                <Form className='nav'>
                    {status && status.error ? (
                        <FormBS.Text className='text-warning'>
                            {status.error}
                        </FormBS.Text>
                    ) : (
                        ''
                    )}
                    <FormBS.Group className='mr-2 mb-0'>
                        <TextField
                            name='username'
                            type='email'
                            placeholder='Email Address'
                            className='mr-2 mb-0'
                            errorClassName='text-warning'
                        />
                        <CheckBOXField name='remember_me' className='mr-2 mb-0'>
                            Remember me
                        </CheckBOXField>
                    </FormBS.Group>
                    <TextField
                        name='password'
                        type='password'
                        placeholder='Password'
                        className='mr-2 mb-0'
                        errorClassName='text-warning'
                        bottomText={
                            <BottomLink to='/dashboard'>
                                Forgot Password?
                            </BottomLink>
                        }
                    />
                    <FormBS.Group>
                        <FilledButton
                            variant='success'
                            type='submit'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Spinner
                                    as='span'
                                    animation='border'
                                    size='sm'
                                    role='status'
                                    aria-hidden='true'
                                />
                            ) : (
                                'Login'
                            )}
                        </FilledButton>
                    </FormBS.Group>
                </Form>
            )}
        </Formik>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        authenticateUser: (
            username: string,
            password: string,
            remember_me: boolean
        ) => dispatch(authenticateUserAction(username, password, remember_me)),
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);