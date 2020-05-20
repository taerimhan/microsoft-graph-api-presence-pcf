import * as React from "react";
import { createContext, useReducer, useContext, Dispatch } from "react";
import { IInputs } from "./generated/ManifestTypes";
import { rootReducer, IRootState } from "./store";
import { UserlistActions } from "./store/userlist/actions";
import { AuthActions, AuthActionTypes } from "./store/auth/actions";
import { AuthProvider, IIdentity } from "./AuthProvider";
import { IAppProps } from "./App";

const initialState: IRootState = {
    auth: {
        authenticated: false
    },
    userlist: {
        users: []
    }
};

export interface IAppContext {
    authProvider: AuthProvider,
    componentContext: ComponentFramework.Context<IInputs>,
    state: IRootState,
    dispatch: Dispatch<UserlistActions | AuthActions>
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProps> = (props) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const { authProvider, componentContext } = props;
    return (
        <AppContext.Provider value={{ authProvider, componentContext, state, dispatch }} >
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export const useAuthContext = () => {
    const { authProvider, state, dispatch } = useAppContext();
    const { auth } = state;

    const login = () => {
        authProvider.login().then(() => {
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS
            });
        }, (err) => {
            dispatch({
                type: AuthActionTypes.LOGIN_FAILURE,
                payload: err
            });
        });
    };

    const logout = () => {
        authProvider.logout();
        dispatch({
            type: AuthActionTypes.LOGOUT
        });
    };

    const getAccessToken = async (): Promise<string> => {
        return authProvider.getAccessToken();
    };

    const handleAuthentication = async () => {
        const account = authProvider.getAccount();
        if (authProvider.getAccount()) {
            await authProvider.getIdentity().then((identity?: IIdentity) => {
                if (identity) {
                    dispatch({
                        type: AuthActionTypes.SET_IDENTITY,
                        payload: identity
                    });
                }
            }, (err) => {
                dispatch({
                    type: AuthActionTypes.AUTH_FAILURE,
                    payload: err
                });
            });
        }
        return account;
    };

    return {
        authenticated: auth.authenticated,
        identity: auth.identity,
        login,
        logout,
        getAccessToken,
        handleAuthentication
    };
}