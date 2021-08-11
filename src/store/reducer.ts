import { AnyAction, combineReducers, EmptyObject } from 'redux';

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
}

export interface State {
  auth: AuthState
}
const combinedReducer = combineReducers({
 
});

const rootReducer= (state:EmptyObject|undefined, action:AnyAction) => {
  return combinedReducer(state, action);
};

export default rootReducer;
