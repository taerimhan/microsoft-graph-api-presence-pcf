import * as React from "react";
import { Stack, IStackStyles, Persona, PersonaPresence, PersonaSize } from "office-ui-fabric-react";
import { IInputs } from "../generated/ManifestTypes";
import { useAppContext, useAuthContext } from "../AppContext";
import { IUser } from "../interfaces/IUser";
import { UserlistActionTypes } from "../store/userlist/actions";
import { getPresencesByUserId } from "../GraphService";
import { AuthActionTypes } from "../store/auth/actions";

const personaWrapper: IStackStyles = {
    root: {
        backgroundColor: "#efefef", 
        padding: 8, 
        flex: "1 1 0",
        cursor: "pointer" 
    }
}

export const Users: React.FC = () => {
    const { state, dispatch, componentContext } = useAppContext();
    const { authenticated, getAccessToken } = useAuthContext();
    const { userlist } = state;

    React.useEffect(() => {
        dispatch({ type: UserlistActionTypes.LOAD_USERS });
        try {
            const users = getUsers(componentContext);
            if (authenticated) {
                getAccessToken().then((token) => {
                    getPresences(token, users).then((updatedUsers) => {
                        dispatch({ 
                            type: UserlistActionTypes.LOAD_USERS_SUCCESS, 
                            payload: updatedUsers 
                        });
                    }, (err) => {
                        dispatch({ 
                            type: UserlistActionTypes.LOAD_USERS_FAILURE, 
                            payload: err 
                        });
                    })
                }, (err) => {
                    dispatch({ 
                        type: AuthActionTypes.AUTH_FAILURE, 
                        payload: err 
                    });
                });
            }
            else {
                dispatch({ 
                    type: UserlistActionTypes.LOAD_USERS_SUCCESS, 
                    payload: users 
                });
            }
        } catch (err) {
            dispatch({ 
                type: UserlistActionTypes.LOAD_USERS_FAILURE, 
                payload: err 
            });
        }
    }, [componentContext.parameters.dataSet, authenticated]);

    return (
        <Stack horizontal wrap tokens={{childrenGap: 8}}>
            {userlist.users.map(user => (
                <Stack key={user.key} styles={personaWrapper}>
                    <Persona
                        size={PersonaSize.size72}
                        text={user.fullname}
                        secondaryText={user.jobTitle}
                        tertiaryText={mapPresenceActivity(user.presenceActivity)}
                        presence={mapPresenceAvailability(user.presenceAvailability)}
                        onClick={()=>openForm(componentContext, user)}
                    />
                </Stack>
            ))}
        </Stack>);
}

const getUsers = (componentContext: ComponentFramework.Context<IInputs>): IUser[] => {
    const dataSet = componentContext.parameters.dataSet;
    const users = dataSet.sortedRecordIds.map<IUser>(recordId => ({
        key: recordId,
        azureADObjectId: dataSet.records[recordId].getFormattedValue("azureactivedirectoryobjectid"),
        fullname: dataSet.records[recordId].getFormattedValue("fullname"),
        jobTitle: dataSet.records[recordId].getFormattedValue("jobTitle")
    }));
    return users;
}

const getPresences = async (accessToken: string, users: IUser[]): Promise<IUser[]> => {
    const ids = users.map(user => user.azureADObjectId)
    const res = await getPresencesByUserId(accessToken, ids);
    if (res && res.value) {
        users.map(user => {
            const presence = res.value.find((r: any) => r.id?.toLocaleLowerCase() == user.azureADObjectId.toLocaleLowerCase());
            if (presence) {
                user.presenceAvailability = presence.availability;
                user.presenceActivity = presence.activity
            }
        })
    }
    return users;
}

const mapPresenceAvailability = (availability?: string): PersonaPresence => {
    switch (availability) {
        case "Available":
        case "AvailableIdle":
            return PersonaPresence.online;
        case "Away":
        case "BeRightBack":
            return PersonaPresence.away;
        case "Busy":
        case "BusyIdle":
            return PersonaPresence.busy;
        case "DoNotDisturb":
            return PersonaPresence.dnd;
        case "Offline":
            return PersonaPresence.offline;
    }
    return PersonaPresence.none;
}

const mapPresenceActivity = (activity?: string): string => {
    switch(activity) {
        case "BeRightBack": return "Be Right Back";
        case "DoNotDisturb": return "Do Not Disturb";
        case "InACall": return "In A Call";
        case "InAConferenceCall": return "In A Conference Call";
        case "InAMeeting": return "In A Meeting";
        case "OffWork": return "Off Work";
        case "OutOfOffice": return "Out Of Office";
        case "PresenceUnknown": return "Presence Unknown";
        case "UrgentInterruptionsOnly": return "Urgent Interruptions Only";
        default:
            return activity || "";
    }
}

const openForm = (componentContext: ComponentFramework.Context<IInputs>, user: IUser): void => {
    componentContext.navigation.openForm({ entityId: user.key, entityName: "systemuser", openInNewWindow: true } as ComponentFramework.NavigationApi.EntityFormOptions)
};