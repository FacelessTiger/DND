import { DNDEventType } from "./DNDEventType";
import { MessageBase } from "../messages";

export interface MessageHistoryDNDEventInterface 
{
    type: DNDEventType
    messages: MessageBase[]
}

export class MessageHistoryDNDEvent implements MessageHistoryDNDEventInterface
{
    public type: DNDEventType;
    public messages: MessageBase[];

    constructor(messages: MessageBase[])
    {
        this.type = DNDEventType.messageHistory;
        this.messages = messages;
    }
}