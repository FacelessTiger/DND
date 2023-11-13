"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHistoryDNDEvent = void 0;
const DNDEventType_1 = require("./DNDEventType");
class MessageHistoryDNDEvent {
    constructor(messages) {
        this.type = DNDEventType_1.DNDEventType.messageHistory;
        this.messages = messages;
    }
}
exports.MessageHistoryDNDEvent = MessageHistoryDNDEvent;
