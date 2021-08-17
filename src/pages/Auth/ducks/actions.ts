import {
    AUTH_USER,
    SIGNOUT,
    FETCH_USER,
    UPDATE_AUTH_TOKEN,
    UPDATE_AUTH_USER_INFO,
    UPDATE_AUTH_USER_COVER_PICTURE,
    UPDATE_AUTH_USER_PROFILE_PICTURE,
} from 'pages/Auth/ducks/action-types';
import { setUserToken } from 'utils/user';
import {
    authenticateUser,
    registerUser,
    getUserInfo,
    setAuthToken,
    changeUserPassword,
    updateUserProfile,
    updateUserCoverPicture,
    updateUserProfilePicture,
} from 'api';
import { AppDispatch } from 'store';

export function setAuthUser(payload: any) {
    return { type: AUTH_USER, payload };
}

export function deleteUserInfo() {
    return { type: SIGNOUT };
}

export function fetchAuthUserInfo(payload: any) {
    return { type: FETCH_USER, payload };
}
export function updateAuthToken(payload: any) {
    return { type: UPDATE_AUTH_TOKEN, payload };
}

export function updateAuthUserInfo(payload: any) {
    return { type: UPDATE_AUTH_USER_INFO, payload };
}

export function updateAuthUserCoverPicture(payload: any) {
    return { type: UPDATE_AUTH_USER_COVER_PICTURE, payload };
}

export function updateAuthUserProfilePicture(payload: any) {
    return { type: UPDATE_AUTH_USER_PROFILE_PICTURE, payload };
}
export const authenticateUserAction =
    (username: string, password: string, remember_me: boolean) =>
    (dispatch: AppDispatch) => {
        return authenticateUser(username, password)
            .then((resp) => {
                if (resp) {
                    dispatch(setAuthUser(resp));
                    setUserToken(resp.token, remember_me);
                    setAuthToken(resp.token);
                    return true;
                }
                return Promise.reject(resp);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

export const registerUserAction =
    (
        email: string,
        password: string,
        confirm_password: string,
        first_name: string,
        last_name: string,
        gender: string,
        birthday: Date
    ) =>
    (dispatch: AppDispatch) => {
        return registerUser(
            email,
            password,
            confirm_password,
            first_name,
            last_name,
            gender,
            birthday
        )
            .then((resp) => {
                if (resp) {
                    dispatch(setAuthUser(resp));
                    setUserToken(resp.token);
                    setAuthToken(resp.token);
                    return true;
                }
                return Promise.reject(resp);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

export const updateAuthUserInfoAction =
    (updatedInfo: any) => (dispatch: AppDispatch) => {
        return updateUserProfile(updatedInfo)
            .then((resp) => {
                if (resp) {
                    dispatch(updateAuthUserInfo(resp));
                    return true;
                }
                return Promise.reject(resp);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

export const fetchUserInfoAction = () => (dispatch: AppDispatch) => {
    return getUserInfo()
        .then((resp) => {
            if (resp) {
                dispatch(fetchAuthUserInfo(resp));
                return true;
            }
            return Promise.reject(resp);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
};

export const updateUserPasswordAction =
    (
        current_password: string,
        new_password: string,
        confirm_new_password: string
    ) =>
    (dispatch: AppDispatch) => {
        return changeUserPassword(
            current_password,
            new_password,
            confirm_new_password
        )
            .then((resp) => {
                if (resp) {
                    dispatch(updateAuthToken(resp));
                    setUserToken(resp.token);
                    setAuthToken(resp.token);
                    return true;
                }
                return Promise.reject(resp);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

export const updateUserCoverPictureAction =
    (cover_picture: any) => (dispatch: AppDispatch) => {
        return updateUserCoverPicture(cover_picture)
            .then((resp) => {
                if (resp) {
                    dispatch(updateAuthUserCoverPicture(resp));
                    return true;
                }
                return Promise.reject(resp);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

export const updateUserProfilePictureAction =
    (profile_picture: any) => (dispatch: AppDispatch) => {
        return updateUserProfilePicture(profile_picture)
            .then((resp) => {
                if (resp) {
                    dispatch(updateAuthUserProfilePicture(resp));
                    return true;
                }
                return Promise.reject(resp);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };
