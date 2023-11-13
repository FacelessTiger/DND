import { DNDEventType } from "./DNDEventType";
import { Server } from "../server";

import { MessageHistoryDNDEvent } from "./MessageHistoryDNDEvent";

import WebSocket from "ws";

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

    public static doServerSide(inter: LoginRequestTokenInterface, ws: WebSocket, server: Server)
    {
        if (!server.accounts.data.has(inter.token)) return;

        server.send(new MessageHistoryDNDEvent(server.messages.data), ws);
    }
}