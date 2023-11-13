import { DNDEventType } from "./DNDEventType";

import { Client } from "@/client";

export interface LoginRequestInterface 
{
    type: DNDEventType
    username: string
    password: string
    rememberMe: boolean
}

export class LoginRequest implements LoginRequestInterface
{
    public type: DNDEventType;
    public username: string;
    public password: string;
    public rememberMe: boolean;

    constructor(username: string, password: string, rememberMe: boolean)
    {
        this.type = DNDEventType.loginRequest;
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe
    }
}