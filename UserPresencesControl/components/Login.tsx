import * as React from "react";
import { useEffect } from "react";
import { ActionButton, Stack } from "office-ui-fabric-react";
import { useAuthContext } from "../AppContext";

export const Login: React.FC = () => {
    const { authenticated, identity, login, logout, handleAuthentication } = useAuthContext();

    useEffect(() => {
        handleAuthentication();
    },[authenticated])

    return (
        <Stack verticalAlign={"center"} horizontalAlign={"end"} horizontal tokens={{ childrenGap: 4 }}>
            {authenticated && (
                <ActionButton iconProps={{ iconName: "Signout" }} onClick={logout}>{identity?.displayName || ""}</ActionButton>
            )}
            {!authenticated && (
                <ActionButton iconProps={{ iconName: "Signin" }} onClick={login}>Sign in</ActionButton>
            )}
        </Stack>
    );
}