"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDNDEvent = void 0;
const DNDEventType_1 = require("./DNDEventType");
const messages_1 = require("../messages");
const rollMessageCompiler_1 = require("../rollMessageCompiler");
const mathjs_1 = require("mathjs");
class MessageDNDEvent {
    constructor(message) {
        this.type = DNDEventType_1.DNDEventType.message;
        this.message = message;
    }
    static doServerSide(inter, ws, server) {
        let e = new MessageDNDEvent(inter.message);
        if (e.message.type == messages_1.MessageType.Message) {
            let messageEvent = e.message;
            let message = messageEvent.message;
            if (e.isCommand(message)) {
                e = e.parseCommand(messageEvent);
            }
        }
        if (e.message.type == messages_1.MessageType.Error) {
            server.send(e, ws);
        }
        else {
            for (let client of server.clients)
                server.send(e, client);
            server.pushMessage(e.message);
        }
    }
    isCommand(message) {
        let words = message.split(" ");
        if ((words[0] == "/roll") && (words.length > 1))
            return true;
        return false;
    }
    parseCommand(messageEvent) {
        let words = messageEvent.message.split(" ");
        if ((words[0] == "/roll"))
            return this.parseRollCommand(messageEvent);
        return new MessageDNDEvent(new messages_1.Error("Invalid command"));
    }
    parseRollCommand(messageEvent) {
        let message = messageEvent.message.substring("/roll ".length);
        let words = message.split(" ");
        let compiler = new rollMessageCompiler_1.RollMessageCompiler(words[0]);
        let rolls = compiler.compile();
        words.splice(0, 1);
        let header = words.join(" ").substring(0, 100);
        let total;
        try {
            total = (0, mathjs_1.evaluate)(compiler.rollsToMathString(rolls));
            return new MessageDNDEvent(new messages_1.Roll(header, messageEvent.author, total, rolls, messageEvent.color));
        }
        catch (e) {
            return new MessageDNDEvent(new messages_1.Error("You suck lol"));
        }
    }
}
exports.MessageDNDEvent = MessageDNDEvent;
