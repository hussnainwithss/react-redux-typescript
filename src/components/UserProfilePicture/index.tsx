import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';
import { Modal, Form as FormBS, Alert, Spinner } from 'react-bootstrap';
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
    ProfileImage,
    ProfileDiv,
    ProfileName,
    OverlayButton,
    OverlayText,
    Overlay,
} from 'components/UserProfilePicture/style';
import { updateUserProfilePictureAction } from 'pages/Auth/ducks/actions';
import { FilledButton } from 'elements/Button';
import userPicture from 'assets/img/user.png';
import {
    FormValues,
    UserProfilePictureProps,
    ProfilePictureProps,
} from 'components/UserProfilePicture/types';

const ProfilePicture: React.FC<ProfilePictureProps> = ({
    picture,
}: ProfilePictureProps) => {
    return (
        <ProfileImage
            src={picture || userPicture}
            className='rounded-circle border border-light border-2 image-responsive'
        />
    );
};

const UserProfilePicture: React.FC<UserProfilePictureProps> = (
    props: UserProfilePictureProps
) => {
    const { user, allowEdit, updateProfilePicture } = props;
    const initialValues: FormValues = { profile_picture: null };
    const validationSchema = Yup.object({
        profile_picture: Yup.mixed().required(
            'Please Select Profile Picture First'
        ),
    });
    const [showProfilePictureModal, setShowProfilePictureModal] =
        useState(false);

    const handleProfilePictureUploadModalShow = () =>
        setShowProfilePictureModal(true);
    const handleProfilePictureUploadModalClose = () =>
        setShowProfilePictureModal(false);

    const profilePictureUploadHandler = (
        values: FormValues,
        { setErrors, setSubmitting, setStatus }: FormikHelpers<FormValues>
    ) => {
        const { profile_picture } = values;
        updateProfilePicture(profile_picture as File)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((response: AxiosResponse) => {
                setStatus({
                    type: 'success',
                    message: 'Cover Picture Updated Successfully!',
                });
                setSubmitting(false);
                setTimeout(() => {
                    handleProfilePictureUploadModalClose();
                }, 1000);
            })
            .catch((error: AxiosError) => {
                const fieldErrors: FormikErrors<FormValues> = {
                    profile_picture: '',
                };
                if (error && error.message) {
                    setStatus({ type: 'danger', message: error.message });
                    console.log(error.message);
                }
                if (error.response && error.response.data.profile_picture) {
                    setStatus({
                        type: 'danger',
                        message: 'Something went wrong!',
                    });
                    fieldErrors.profile_picture =
                        error.response.data.profile_picture;
                }
                setErrors(fieldErrors);
                setSubmitting(false);
            });
    };
    return (
        <>
            <ProfileDiv>
                {!allowEdit ? (
                    <>
                        <ProfilePicture
                            picture={user.profile.profile_picture}
                        />
                    </>
                ) : (
                    <>
                        <OverlayButton
                            onClick={handleProfilePictureUploadModalShow}
                        >
                            <ProfilePicture
                                picture={user.profile.profile_picture}
                            />
                            <Overlay className='rounded-circle'>
                                <OverlayText>
                                    Update Profile Picture
                                </OverlayText>
                            </Overlay>
                        </OverlayButton>
                    </>
                )}
                <ProfileName>{`${user.first_name} ${user.last_name}, ${user.profile__age}`}</ProfileName>
            </ProfileDiv>
            <Modal
                show={showProfilePictureModal}
                onHide={handleProfilePictureUploadModalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload New Profile Picture</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={profilePictureUploadHandler}
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
                                            'profile_picture',
                                            e.target.files[0]
                                        )
                                    }
                                />
                                {touched.profile_picture &&
                                errors.profile_picture ? (
                                    <FormBS.Text className='text-danger'>
                                        {errors.profile_picture}
                                    </FormBS.Text>
                                ) : null}
                            </Modal.Body>
                            <Modal.Footer>
                                <FilledButton
                                    variant='secondary'
                                    onClick={
                                        handleProfilePictureUploadModalClose
                                    }
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
        updateProfilePicture: (profile_picture: File) =>
            dispatch(updateUserProfilePictureAction(profile_picture)),
    };
};

export const connector = connect(null, mapDispatchToProps);
export default connector(UserProfilePicture);
