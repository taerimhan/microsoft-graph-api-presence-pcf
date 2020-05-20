import { UserlistActions } from "./userlist/actions";
import { AuthActions } from "./auth/actions";
import { authReducer, AuthState } from "./auth/reducers";
import { userlistReducer, UserlistState } from "./userlist/reducers";

export interface IRootState {
    auth: AuthState,
    userlist: UserlistState
}

export const rootReducer = (state: IRootState, action: UserlistActions | AuthActions) => ({
    auth: authReducer(state.auth, action as AuthActions),
    userlist: userlistReducer(state.userlist, action as UserlistActions)
});