import React, { useState } from 'react';
import { Formik, Form, FormikHelpers, FormikErrors } from 'formik';
import { AxiosResponse, AxiosError } from 'axios';
import { connect } from 'react-redux';
import { Modal, Form as FormBS, Alert, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { updateUserCoverPictureAction } from 'pages/Auth/ducks/actions';
import {
    CoverDiv,
    CoverImage,
    OverlayButton,
    Overlay,
    OverlayText,
} from 'components/UserCoverPicture/style';
import { FilledButton } from 'elements/Button';
import cover from 'assets/img/cover.png';
import {
    FormValues,
    CoverPictureProps,
    UserCoverPictureProps,
} from 'components/UserCoverPicture/types';

const CoverPicture: React.FC<CoverPictureProps> = (
    props: CoverPictureProps
) => {
    const { picture } = props;
    return <CoverImage className='w-100 ' src={picture || cover} />;
};

const UserCoverPicture: React.FC<UserCoverPictureProps> = (
    props: UserCoverPictureProps
) => {
    const { allowEdit, user, updateCoverPicture } = props;
    const initialValues: FormValues = { cover_picture: null };
    const validationSchema = Yup.object({
        cover_picture: Yup.mixed().required(
            'Please Select Cover Picture First'
        ),
    });
    const [showCoverPictureModal, setShowCoverPictureModal] =
        useState<boolean>(false);
    const handleCoverPictureUploadModalShow = () =>
        setShowCoverPictureModal(true);
    const handleCoverPictureUploadModalClose = () =>
        setShowCoverPictureModal(false);

    const coverPictureUploadHandler = (
        values: FormValues,
        { setErrors, setSubmitting, setStatus }: FormikHelpers<FormValues>
    ) => {
        const { cover_picture } = values;
        updateCoverPicture(cover_picture as File)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((response: AxiosResponse) => {
                setStatus({
                    type: 'success',
                    message: 'Cover Picture Updated Successfully!',
                });
                setSubmitting(false);
                setTimeout(() => {
                    handleCoverPictureUploadModalClose();
                }, 1000);
            })
            .catch((error: AxiosError) => {
                const fieldErrors: FormikErrors<FormValues> = {
                    cover_picture: '',
                };
                if (error && error.message) {
                    setStatus({ type: 'danger', message: error.message });
                }
                if (error.response && error.response.data.cover_picture) {
                    setStatus({
                        type: 'danger',
                        message: 'Something went wrong!',
                    });
                    fieldErrors.cover_picture =
                        error.response.data.cover_picture;
                }
                setErrors(fieldErrors);
                setSubmitting(false);
            });
    };

    return (
        <>
            <CoverDiv>
                {!allowEdit ? (
                    <CoverPicture picture={user.profile.cover_picture} />
                ) : (
                    <OverlayButton
                        onClick={handleCoverPictureUploadModalShow}
                        variant='link'
                        className='w-100'
                    >
                        <CoverPicture picture={user.profile.cover_picture} />
                        <Overlay>
                            <OverlayText>Update Cover Picture</OverlayText>
                        </Overlay>
                    </OverlayButton>
                )}
            </CoverDiv>
            <Modal
                show={showCoverPictureModal}
                onHide={handleCoverPictureUploadModalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload New Cover Picture</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={coverPictureUploadHandler}
                >
                    {({
                        isSubmitting,
                        setFieldValue,
                        touched,
                        errors,
                        status,
                    }) => (
                        <Form>
                            <Modal.Body>
                                {status ? (
                                    <Alert variant={status.type}>
                                        {status.message}
                                    </Alert>
                                ) : (
                                    ''
                                )}
                                <FormBS.File
                                    accept='image/*'
                                    onChange={(e: any) =>
                                        setFieldValue(
                                            'cover_picture',
                                            e.target.files[0]
                                        )
                                    }
                                />
                                {touched.cover_picture &&
                                errors.cover_picture ? (
                                    <FormBS.Text className='text-danger'>
                                        {errors.cover_picture}
                                    </FormBS.Text>
                                ) : null}
                            </Modal.Body>
                            <Modal.Footer>
                                <FilledButton
                                    variant='secondary'
                                    onClick={handleCoverPictureUploadModalClose}
                                    disabled={isSubmitting}
                                >
                                    Close
                                </FilledButton>
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
                                        'Upload'
                                    )}
                                </FilledButton>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateCoverPicture: (cover_picture: File) =>
            dispatch(updateUserCoverPictureAction(cover_picture)),
    };
};

export const connector = connect(null, mapDispatchToProps);
export default connector(UserCoverPicture);
