import { combineReducers } from 'redux';
import auth from 'pages/Auth/ducks/reducer';
import posts from 'pages/Profile/ducks/reducer';

export interface AuthState {
    isAuthenticated: boolean;
    token: string;
}

export interface State {
    auth: AuthState;
}
const combinedReducer = combineReducers({
    auth,
    posts,
});

const rootReducer = (state: any, action: any) => {
    return combinedReducer(state, action);
};

export default rootReducer;
