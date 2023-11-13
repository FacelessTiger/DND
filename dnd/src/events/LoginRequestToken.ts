import { DNDEventType } from "./DNDEventType";

import { Client } from "@/client";

export interface LoginRequestTokenInterface 
{
    type: DNDEventType
    token: number
}

export class LoginRequestToken implements LoginRequestTokenInterface
{
    public type: DNDEventType;
    public token: number;

    constructor(token: number)
    {
        this.type = DNDEventType.loginRequestToken;
        this.token = token;
    }
}