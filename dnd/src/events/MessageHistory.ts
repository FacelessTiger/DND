import { DNDEventType } from "./DNDEventType";
import { MessageBase } from "@/messages";

import { Client } from "@/client";

export interface MessageHistoryInterface 
{
    type: DNDEventType
    messages: MessageBase[]
}

export class MessageHistory implements MessageHistoryInterface
{
    public type: DNDEventType;
    public messages: MessageBase[];

    constructor(messages: MessageBase[])
    {
        this.type = DNDEventType.messageHistory;
        this.messages = messages;
    }

    public static doClientSide(inter: MessageHistoryInterface)
    {
        Client.messages = inter.messages;
    }
}