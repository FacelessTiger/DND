import { DNDEventType } from "./DNDEventType";
import { Server } from "../server";

import { UserType } from "../Account";

import WebSocket from "ws";

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

    public static doServerSide(inter: CreateAccountRequestInterface, ws: WebSocket, server: Server)
    {
        let shouldReturn = false;
        server.accounts.data.forEach((value, key) => {
            if (value.username == inter.username)
            {
                shouldReturn = true;
                return;
            }
        });

        if (shouldReturn)
        {
            // TODO: send back a "failed to create account" event or somethin
            return;
        }

        let token = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        server.accounts.data.set(token, { username: inter.username, password: inter.password, userType: UserType.normal });
        server.accounts.update();
    }
}