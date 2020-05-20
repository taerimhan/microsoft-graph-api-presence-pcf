import { UserlistActions, UserlistActionTypes } from "./actions";
import { IUser } from "../../interfaces/IUser";
import { INormalisedError, getNormalisedError } from "../../utils/errors";

export interface UserlistState {
    users: IUser[];    
    error?: INormalisedError | null;
}

export function userlistReducer(state: UserlistState, action: UserlistActions) {
    switch (action.type) {
        case UserlistActionTypes.LOAD_USERS:
            return {
                ...state
            };

        case UserlistActionTypes.LOAD_USERS_SUCCESS:
            return {
                ...state,
                users: [...action.payload],
                error: null
            };

        case UserlistActionTypes.LOAD_USERS_FAILURE:
            return {
                ...state,
                error: getNormalisedError(action.payload)
            };

        default:
            return state;
    }
}