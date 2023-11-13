import { DNDEventType } from "./DNDEventType";
import { MessageBase, MessageType, Message, Error, Roll } from "../messages";
import { RollMessageCompiler } from "../rollMessageCompiler";
import { Server } from "../server";

import { WebSocket } from 'ws';
import { evaluate } from 'mathjs'

export interface MessageDNDEventInterface 
{
    type: DNDEventType
    message: MessageBase
}

export class MessageDNDEvent implements MessageDNDEventInterface
{
    public type: DNDEventType
    public message: MessageBase

    constructor(message: MessageBase)
    {
        this.type = DNDEventType.message;
        this.message = message;
    }

    public static doServerSide(inter: MessageDNDEventInterface, ws: WebSocket, server: Server)
    {
        let e = new MessageDNDEvent(inter.message);
        if (e.message.type == MessageType.Message)
        {
            let messageEvent = e.message as Message;
            let message = messageEvent.message;

            if (e.isCommand(message))
            {
                e = e.parseCommand(messageEvent);
            }
        }

        if (e.message.type == MessageType.Error)
        {
            server.send(e, ws);
        }
        else
        {
            for (let client of server.clients)
                server.send(e, client);

            server.pushMessage(e.message);
        }
    }

    private isCommand(message: string): boolean
    {
        let words = message.split(" ");
        if ((words[0] == "/roll") && (words.length > 1))
            return true;

        return false;
    }

    private parseCommand(messageEvent: Message): MessageDNDEvent
    {
        let words = messageEvent.message.split(" ");
        if ((words[0] == "/roll"))
            return this.parseRollCommand(messageEvent);

        return new MessageDNDEvent(new Error("Invalid command"));
    }

    private parseRollCommand(messageEvent: Message): MessageDNDEvent
    {
        let message = messageEvent.message.substring("/roll ".length);
        let words = message.split(" ");
 
        let compiler = new RollMessageCompiler(words[0]);
        let rolls = compiler.compile();
        
        words.splice(0, 1);
        let header = words.join(" ").substring(0, 100);
        
        let total: number;
        try
        {
            total = evaluate(compiler.rollsToMathString(rolls));
            return new MessageDNDEvent(new Roll(header, messageEvent.author, total, rolls, messageEvent.color));
        }
        catch (e)
        {
            return new MessageDNDEvent(new Error("You suck lol"));
        }
    }
}