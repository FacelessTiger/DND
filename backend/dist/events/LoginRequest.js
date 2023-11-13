"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequest = void 0;
const DNDEventType_1 = require("./DNDEventType");
const LoginSuccessful_1 = require("./LoginSuccessful");
const MessageHistoryDNDEvent_1 = require("./MessageHistoryDNDEvent");
class LoginRequest {
    constructor(username, password, rememberMe) {
        this.type = DNDEventType_1.DNDEventType.loginRequest;
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
    }
    static doServerSide(inter, ws, server) {
        let token = -1;
        server.accounts.data.forEach((value, key) => {
            if (value.username == inter.username && value.password == inter.password) {
                token = key;
                return;
            }
        });
        if (token == -1) {
            // TODO: send back a "failed to login message" or somethin
            return;
        }
        server.send(new LoginSuccessful_1.LoginSuccessful(token, inter.rememberMe), ws);
        server.send(new MessageHistoryDNDEvent_1.MessageHistoryDNDEvent(server.messages.data), ws);
    }
}
exports.LoginRequest = LoginRequest;
