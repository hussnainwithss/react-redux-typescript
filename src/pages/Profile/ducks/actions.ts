import {
    FETCH_USER_POSTS,
    ADD_USER_POST,
} from 'pages/Profile/ducks/action-types';

import { createPost, getUserPosts } from 'api';
import { AppDispatch } from 'store';
import { Post } from 'pages/Profile/types';

export function fetchUserPosts(payload: Post[]) {
    return { type: FETCH_USER_POSTS, payload };
}

export function addUserPost(payload: Post) {
    return { type: ADD_USER_POST, payload };
}

export const fetchUserPostsAction = () => (dispatch: AppDispatch) => {
    return getUserPosts()
        .then((resp) => {
            if (resp) {
                dispatch(fetchUserPosts(resp));
                return true;
            }
            return Promise.reject(resp);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
};

export const addUserPostAction =
    (content: string, image: File | null) => (dispatch: AppDispatch) => {
        return createPost(content, image)
            .then((resp) => {
                if (resp) {
                    dispatch(addUserPost(resp));
                    return true;
                }
                return Promise.reject(resp);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };
