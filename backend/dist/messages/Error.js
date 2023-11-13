"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const MessageBase_1 = require("./MessageBase");
class Error extends MessageBase_1.MessageBase {
    constructor(errorMessage) {
        super();
        this.type = MessageBase_1.MessageType.Error;
        this.errorMessage = errorMessage;
    }
}
exports.Error = Error;
