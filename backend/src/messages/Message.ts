import { MessageBase, MessageType } from "./MessageBase";

export class Message extends MessageBase
{
    public message: string;
    public author: string;
    public color: string;

    constructor(message: string, author: string, color: string)
    {
        super();

        this.type = MessageType.Message;
        this.message = message;
        this.author = author;
        this.color = color;
    }
}