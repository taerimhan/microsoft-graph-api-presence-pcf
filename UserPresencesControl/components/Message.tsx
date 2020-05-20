import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import { useAppContext } from "../AppContext";

export const Message: React.FC = () => {
    const { state } = useAppContext();
    const { auth, userlist } = state;
    
    const message = auth.error ?? userlist.error;
    if (message) console.log(message.detail);

    return (
        <div>
            {message &&
                <MessageBar messageBarType={MessageBarType.error}>{message.message}</MessageBar>
            }
        </div>
    );
}