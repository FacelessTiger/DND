"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollType = exports.Error = exports.Roll = exports.Message = exports.MessageBase = exports.MessageType = void 0;
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
class Message extends MessageBase {
    constructor(message, author, color) {
        super();
        this.type = MessageType.Message;
        this.message = message;
        this.author = author;
        this.color = color;
    }
}
exports.Message = Message;
class Roll extends MessageBase {
    constructor(header, author, total, rolls, color) {
        super();
        this.type = MessageType.Roll;
        this.author = author;
        this.header = header;
        this.total = total;
        this.rolls = rolls;
        this.color = color;
    }
}
exports.Roll = Roll;
class Error extends MessageBase {
    constructor(errorMessage) {
        super();
        this.type = MessageType.Error;
        this.errorMessage = errorMessage;
    }
}
exports.Error = Error;
var RollType;
(function (RollType) {
    RollType[RollType["Standard"] = 0] = "Standard";
    RollType[RollType["AdvantageDisadvantage"] = 1] = "AdvantageDisadvantage";
})(RollType = exports.RollType || (exports.RollType = {}));
