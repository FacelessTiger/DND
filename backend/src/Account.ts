export enum UserType
{
    normal,
    dm
}

export interface Account
{
    username: string
    password: string
    userType: UserType
}