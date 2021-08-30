import axios, { AxiosError, AxiosResponse } from 'axios';
import getRoute from 'api/routes';
import { AppRoutes } from 'routes';
import { RegisterUserTypes, authenticateUserProps } from 'api/types';
import { FormValues as UpdateUserInfoParams } from 'pages/Profile/types';
import { FormValues as UpdatePasswordParams } from 'pages/Auth/types';

export const setAuthToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Token ${token}`;
};

const failedResponse = (error: AxiosError) => {
    if (
        error.response &&
        error.response.status &&
        error.response.status === 401
    ) {
        window.location.replace(AppRoutes.LOGOUT.path);
    }
    return Promise.reject(error);
};

const getRequest = (route: string) => {
    return axios
        .get(route)
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            return failedResponse(error);
        });
};

export const postRequest = (
    route: string,
    data: Record<string, string | number | Date | any> = {}
) => {
    return axios
        .post(route, data)
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            return failedResponse(error);
        });
};

export const putRequest = (
    route: string,
    data: Record<string, string | number | Date | any> = {}
) => {
    return axios
        .put(route, data)
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            return failedResponse(error);
        });
};
export const patchRequest = (
    route: string,
    data: Record<string, string | number | Date | any> = {}
) => {
    return axios
        .patch(route, data)
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            return failedResponse(error);
        });
};

export const registerUser = (
    email: string,
    password: string,
    confirm_password: string,
    first_name: string,
    last_name: string,
    gender: string,
    birthday: string
) => {
    const data: RegisterUserTypes = {
        email,
        password,
        confirm_password,
        first_name,
        last_name,
        gender,
        birthday,
    };
    const route: string = getRoute('registerUser');
    return postRequest(route, data);
};

export const authenticateUser = (username: string, password: string) => {
    const data: authenticateUserProps = { username, password };
    const route = getRoute('login');
    return postRequest(route, data);
};

export const getUserInfo = (userId?: number | string | undefined) => {
    const route = getRoute('userProfile', { id: userId });
    return getRequest(route);
};

export const updateUserProfile = (updatedUserInfo: UpdateUserInfoParams) => {
    const data: UpdateUserInfoParams = updatedUserInfo;
    const route = getRoute('updateProfile');
    return putRequest(route, data);
};

export const changeUserPassword = (
    current_password: string,
    new_password: string,
    confirm_new_password: string
) => {
    const data: UpdatePasswordParams = {
        current_password,
        new_password,
        confirm_new_password,
    };
    const route = getRoute('changePassword');
    return patchRequest(route, data);
};

export const createPost = (content: string, image: File | null) => {
    const data = new FormData();
    if (content) data.append('content', content);
    if (image) data.append('image', image, image.name);
    const route = getRoute('userPost');
    return postRequest(route, data);
};

export const getUserPosts = (userId?: number | string) => {
    const route = getRoute('userPost', { id: userId });
    return getRequest(route);
};

export const updateUserProfilePicture = (profile_picture: File) => {
    const data = new FormData();
    data.append('profile_picture', profile_picture, profile_picture.name);
    const route = getRoute('updateProfileImages');
    return patchRequest(route, data);
};

export const updateUserCoverPicture = (cover_picture: File) => {
    const data = new FormData();
    data.append('cover_picture', cover_picture, cover_picture.name);
    const route = getRoute('updateProfileImages');
    return patchRequest(route, data);
};

export const userSearch = (searchParams: Record<string, string>) => {
    const route = getRoute('userSearch', searchParams);
    return getRequest(route);
};
