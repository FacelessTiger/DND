"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const MessageBase_1 = require("./MessageBase");
class Message extends MessageBase_1.MessageBase {
    constructor(message, author, color) {
        super();
        this.type = MessageBase_1.MessageType.Message;
        this.message = message;
        this.author = author;
        this.color = color;
    }
}
exports.Message = Message;
