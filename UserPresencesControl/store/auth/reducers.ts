import { AuthActions, AuthActionTypes } from "./actions";
import { IIdentity } from "../../AuthProvider";
import { INormalisedError, getNormalisedError } from "../../utils/errors";

export interface AuthState {
    authenticated: boolean;
    identity?: IIdentity;
    error?: INormalisedError | null;
}

export function authReducer(state: AuthState, action: AuthActions) {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                authenticated: false
            };

        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                error: null
            };

        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                authenticated: false,
                error: getNormalisedError(action.payload)
            };

        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                authenticated: false
            };

        case AuthActionTypes.SET_IDENTITY:
            return {
                ...state,
                authenticated: true,
                identity: action.payload,
                error: null
            };

        case AuthActionTypes.AUTH_FAILURE:
            return {
                ...state,
                error: getNormalisedError(action.payload)
            };

        default:
            return state;
    }
}