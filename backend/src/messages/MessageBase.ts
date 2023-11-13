export enum MessageType
{
    None,
    Message,
    Roll,
    Error
}

export class MessageBase
{
    public type: MessageType = MessageType.None;
}