import { DNDEventType } from "./DNDEventType";
import { Server } from "../server";

import WebSocket from "ws";

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
}