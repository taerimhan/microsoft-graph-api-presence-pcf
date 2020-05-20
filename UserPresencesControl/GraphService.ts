import graph = require("@microsoft/microsoft-graph-client");

export const getAuthenticatedClient = (accessToken: string) => {
    return graph.Client.init({
        authProvider: (done: any) => {
            done(null, accessToken);
        }
    });
}

// Doc reference: https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
export const getUserDetails = async(accessToken: string) => {
    const client = getAuthenticatedClient(accessToken);
    const user = await client.api("/me")
                        .select(["department","displayName","id","mail","userPrincipalName"])
                        .get();
    return user;
}

// Doc reference: https://docs.microsoft.com/en-us/graph/api/cloudcommunications-getpresencesbyuserid?view=graph-rest-beta
export const getPresencesByUserId = async(accessToken: string, ids: string[]) => {
    const client = getAuthenticatedClient(accessToken);
    const res = await client.api("/communications/getPresencesByUserId")
                             .version("beta")
                             .post({ids});
    return res;
}