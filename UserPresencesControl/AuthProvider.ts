import { UserAgentApplication } from 'msal';
import { IConfig } from "./interfaces/IConfig";
import { getUserDetails } from './GraphService';

export interface IIdentity {
    displayName: string,
    email: string
}

export class AuthProvider {
    private _userAgentApplication: UserAgentApplication;
    
    constructor(private _config: IConfig) {
        this._userAgentApplication = new UserAgentApplication({
            auth: {
                clientId: _config.appId,
                redirectUri: _config.appRedirectUrl,
                authority: _config.appAuthority,
                postLogoutRedirectUri: window.location.href
            },
            cache: {
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: true
            }
        })
    }

    async login() {
        await this._userAgentApplication.loginPopup({
            scopes: this._config.appScopes,
            prompt: "select_account"
        });
    }

    logout() {
        this._userAgentApplication.logout();
    }

    getAccount() {
        return this._userAgentApplication.getAccount();
    }

    async getIdentity(): Promise<IIdentity | undefined> {
        const accessToken = await this.getAccessToken();
        if (accessToken) {
            const user = await getUserDetails(accessToken);
            return {
                displayName: user.displayName,
                email: user.mail || user.userPrincipalName
            };
        }
    }

    async getAccessToken(): Promise<string> {
        try {
            const silentResponse = await this._userAgentApplication.acquireTokenSilent({
                scopes: this._config.appScopes
            });
            return silentResponse.accessToken;
        } catch (err) {
            if (this.isInteractionRequired(err)) {
                const interactiveResponse = await this._userAgentApplication.acquireTokenPopup({
                    scopes: this._config.appScopes
                });
                return interactiveResponse.accessToken;
            } else {
                throw err;
            }
        }
    }

    private isInteractionRequired(error: Error): boolean {
        if (error.message?.length <= 0) {
            return false;
        }

        return (
            error.message.indexOf('consent_required') > -1 ||
            error.message.indexOf('interaction_required') > -1 ||
            error.message.indexOf('login_required') > -1
        );
    }
}