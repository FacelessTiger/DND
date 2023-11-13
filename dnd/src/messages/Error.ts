import { MessageBase, MessageType } from "./MessageBase";

export class Error extends MessageBase
{
    public errorMessage: string;

    constructor(errorMessage: string)
    {
        super();

        this.type = MessageType.Error;
        this.errorMessage = errorMessage;
    }
}