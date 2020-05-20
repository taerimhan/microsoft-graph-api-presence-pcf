import { IIdentity } from "../../AuthProvider"

export enum AuthActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT',
    SET_IDENTITY = 'SET_IDENTITY',
    AUTH_FAILURE = 'AUTH_FAILURE'
}

type LoginAction = {
    type: typeof AuthActionTypes.LOGIN
}

type LogoutAction = {
    type: typeof AuthActionTypes.LOGOUT
}

type LoginFailure = {
    type: typeof AuthActionTypes.LOGIN_FAILURE,
    payload: any
}

type LoginSucess = {
    type: typeof AuthActionTypes.LOGIN_SUCCESS
}

type SetAuthenticated = {
    type: typeof AuthActionTypes.SET_IDENTITY,
    payload: IIdentity
}

type AuthFailure = {
    type: typeof AuthActionTypes.AUTH_FAILURE,
    payload: any
}

export type AuthActions = 
    | LoginAction
    | LoginSucess
    | LoginFailure
    | LogoutAction
    | SetAuthenticated
    | AuthFailure;