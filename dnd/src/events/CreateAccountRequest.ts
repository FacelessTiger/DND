import { DNDEventType } from "./DNDEventType";
import { MessageBase } from "@/messages";

import { Client } from "@/client";

export interface CreateAccountRequestInterface
{
    type: DNDEventType
    username: string
    password: string
}

export class CreateAccountRequest implements CreateAccountRequestInterface
{
    public type: DNDEventType;
    public username: string;
    public password: string;

    constructor(username: string, password: string)
    {
        this.type = DNDEventType.createAccountRequest;
        this.username = username;
        this.password = password;
    }
}