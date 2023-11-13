import { DNDEventType } from "./DNDEventType";
import { MessageBase } from "@/messages";

import { Client } from "@/client";

export interface LoginSuccessfulInterface 
{
    type: DNDEventType
    token: number
    rememberMe: boolean
}

export class LoginSuccessful implements LoginSuccessfulInterface
{
    public type: DNDEventType;
    public token: number;
    public rememberMe: boolean;

    constructor(token: number, rememberMe: boolean)
    {
        this.type = DNDEventType.loginSuccessful;
        this.token = token;
        this.rememberMe = rememberMe;
    }

    public static doClientSide(inter: LoginSuccessful)
    {
        if (inter.rememberMe)
            localStorage.setItem("token", inter.token.toString());

        Client.token = inter.token;
    }
}