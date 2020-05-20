import { IUser } from "../../interfaces/IUser";

export enum UserlistActionTypes {
    LOAD_USERS = "LOAD_USERS",
    LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS",
    LOAD_USERS_FAILURE = "LOAD_USERS_FAILURE"
}

type LoadUsersAction = {
    type: typeof UserlistActionTypes.LOAD_USERS
}

type LoadUsersSuccessAction = {
    type: typeof UserlistActionTypes.LOAD_USERS_SUCCESS;
    payload: IUser[];
}

type LoadUsersFailureAction = {
    type: typeof UserlistActionTypes.LOAD_USERS_FAILURE;
    payload: any;
}

export type UserlistActions = 
    | LoadUsersAction
    | LoadUsersSuccessAction
    | LoadUsersFailureAction;