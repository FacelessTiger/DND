import { DNDEventType } from "./DNDEventType";
import { Server } from "../server";

import { LoginSuccessful } from "./LoginSuccessful";
import { MessageHistoryDNDEvent } from "./MessageHistoryDNDEvent";

import WebSocket from "ws";

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
        this.rememberMe = rememberMe;
    }

    public static doServerSide(inter: LoginRequestInterface, ws: WebSocket, server: Server)
    {
        let token = -1;
        server.accounts.data.forEach((value, key) => {
            if (value.username == inter.username && value.password == inter.password)
            {
                token = key;
                return;
            }
        });

        if (token == -1)
        {
            // TODO: send back a "failed to login message" or somethin
            return;
        }

        server.send(new LoginSuccessful(token, inter.rememberMe), ws);
        server.send(new MessageHistoryDNDEvent(server.messages.data), ws);
    }
}