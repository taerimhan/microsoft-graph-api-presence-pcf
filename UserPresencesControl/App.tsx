import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { AppProvider } from "./AppContext";
import { AuthProvider } from "./AuthProvider";
import { Login } from "./components/Login";
import { Users } from "./components/Users";
import { Message } from "./components/Message";

export interface IAppProps {
    componentContext: ComponentFramework.Context<IInputs>
    authProvider: AuthProvider
}

export const App: React.FC<IAppProps> = (props: IAppProps) => {
    return (
        <AppProvider {...props}>
            <Message></Message>
            <Login></Login>
            <Users></Users>
        </AppProvider>
    );
}