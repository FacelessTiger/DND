"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBase = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["None"] = 0] = "None";
    MessageType[MessageType["Message"] = 1] = "Message";
    MessageType[MessageType["Roll"] = 2] = "Roll";
    MessageType[MessageType["Error"] = 3] = "Error";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class MessageBase {
    constructor() {
        this.type = MessageType.None;
    }
}
exports.MessageBase = MessageBase;
