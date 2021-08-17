import React from 'react';
import { connect } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Form as FormBS, Spinner } from 'react-bootstrap';
import { CreatePostTextArea } from 'components/CreatePostPrompt/style';
import { addUserPostAction } from 'pages/Profile/ducks/actions';
import { FilledButton } from 'elements/Button';

const successNotification = 'Post Created Successfully.';

interface InitialValuesTypes {
    content: string;
    image: null | File;
}
const CreatePostPrompt = ({
    createPost,
    setPostStatus,
    setShowAlert,
}: {
    createPost?: any;
    setPostStatus?: any;
    setShowAlert?: any;
}) => {
    const initialValues: InitialValuesTypes = {
        content: '',
        image: null,
    };
    const validationSchema = Yup.object({
        image: Yup.mixed(),
        content: Yup.string()
            .when('image', {
                is: (val: any) => val === null,
                then: Yup.string().required('Post Cannot be Empty!'),
            })
            .max(255),
    });
    function createPostHandler(
        values: InitialValuesTypes,
        {
            resetForm,
            setSubmitting,
            setErrors,
        }: { resetForm: any; setSubmitting: any; setErrors: any }
    ) {
        const { content, image }: InitialValuesTypes = values;
        const fieldErrors: InitialValuesTypes = {
            content: '',
            image: null,
        };

        createPost(content, image)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((response: AxiosResponse) => {
                setPostStatus({
                    message: successNotification,
                    type: 'success',
                });
                resetForm();
                (
                    document.getElementById('post-input') as HTMLInputElement
                ).value = '';
                setSubmitting(false);
                setShowAlert(true);
            })
            .catch((error: AxiosError) => {
                if (error && error.message)
                    setPostStatus({ message: error.message, type: 'danger' });
                if (error?.response?.data?.message)
                    [fieldErrors.content] = [error.response.data.message[0]];
                if (error?.response?.data && error?.response?.data?.content)
                    [fieldErrors.content] = [error.response.data.content[0]];
                if (error?.response?.data && error?.response?.data?.image)
                    [fieldErrors.image] = [error.response.data.image[0]];
                setErrors(fieldErrors);
                setSubmitting(false);
                setShowAlert(true);
            });
    }

    return (
        <Card className='mb-5'>
            <Card.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={createPostHandler}
                >
                    {({
                        setFieldValue,
                        touched,
                        errors,
                        isSubmitting,
                        values,
                    }) => (
                        <Form>
                            {console.log(values)}

                            <FormBS.Row className='mb-2'>
                                <CreatePostTextArea
                                    as='textarea'
                                    type='text'
                                    row='3'
                                    placeholder="What's on your mind....."
                                    errorClassName='text-danger'
                                    name='content'
                                    className={
                                        errors.content
                                            ? 'w-100 border-2 field-error rounded'
                                            : 'w-100 rounded'
                                    }
                                    haserror={errors.content}
                                    value={values.content}
                                    onChange={(e: any) =>
                                        setFieldValue('content', e.target.value)
                                    }
                                />
                                {touched.content && errors.content ? (
                                    <FormBS.Text className='text-danger'>
                                        {errors.content}
                                    </FormBS.Text>
                                ) : null}
                            </FormBS.Row>
                            <FormBS.Label>Upload Image</FormBS.Label>
                            <FormBS.File
                                accept='image/*'
                                name='image'
                                className='mb-3'
                                onChange={(e: any) =>
                                    setFieldValue('image', e.target.files[0])
                                }
                                id='post-input'
                            />
                            {touched.image && errors.image ? (
                                <FormBS.Text className='text-danger'>
                                    {errors.image}
                                </FormBS.Text>
                            ) : null}
                            <FilledButton
                                variant='primary'
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
                                    <span>Post</span>
                                )}
                            </FilledButton>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        createPost: (content: string, image: File) =>
            dispatch(addUserPostAction(content, image)),
    };
};

export default connect(null, mapDispatchToProps)(CreatePostPrompt);
