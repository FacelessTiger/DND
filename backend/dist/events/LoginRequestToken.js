"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestToken = void 0;
const DNDEventType_1 = require("./DNDEventType");
const MessageHistoryDNDEvent_1 = require("./MessageHistoryDNDEvent");
class LoginRequestToken {
    constructor(token) {
        this.type = DNDEventType_1.DNDEventType.loginRequestToken;
        this.token = token;
    }
    static doServerSide(inter, ws, server) {
        if (!server.accounts.data.has(inter.token))
            return;
        server.send(new MessageHistoryDNDEvent_1.MessageHistoryDNDEvent(server.messages.data), ws);
    }
}
exports.LoginRequestToken = LoginRequestToken;
