import { DNDEventType } from "./DNDEventType";
import { MessageBase } from "@/messages";

import { Client } from "@/client";

export interface MessageInterface 
{
    type: DNDEventType
    message: MessageBase
}

export class Message implements MessageInterface
{
    public type: DNDEventType;
    public message: MessageBase;

    constructor(message: MessageBase)
    {
        this.type = DNDEventType.message;
        this.message = message;
    }

    public static doClientSide(inter: MessageInterface)
    {
        Client.messages.push(inter.message);
    }
}