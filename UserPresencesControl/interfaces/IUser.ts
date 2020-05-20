export interface IUser {
    key: string,
    azureADObjectId: string,
    fullname: string,
    jobTitle: string,
    presenceAvailability?: string;
    presenceActivity?: string;
}