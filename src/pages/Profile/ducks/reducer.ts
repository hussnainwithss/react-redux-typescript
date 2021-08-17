/* eslint-disable no-param-reassign */
import {
    FETCH_USER_POSTS,
    ADD_USER_POST,
} from 'pages/Profile/ducks/action-types';

import { Post } from 'pages/Profile/ducks/actions';

interface IState {
    posts: Post[];
}
const initialState: IState = { posts: [] };

function reducer(state: IState = initialState, action: any) {
    switch (action.type) {
        case FETCH_USER_POSTS:
            state = {
                ...state,
                posts: action.payload,
            };
            break;
        case ADD_USER_POST:
            state = {
                ...state,
                posts: [action.payload, ...state.posts],
            };
            break;
        default:
    }
    return state;
}

export default reducer;
