"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountRequest = void 0;
const DNDEventType_1 = require("./DNDEventType");
const Account_1 = require("../Account");
class CreateAccountRequest {
    constructor(username, password) {
        this.type = DNDEventType_1.DNDEventType.createAccountRequest;
        this.username = username;
        this.password = password;
    }
    static doServerSide(inter, ws, server) {
        let shouldReturn = false;
        server.accounts.data.forEach((value, key) => {
            if (value.username == inter.username) {
                shouldReturn = true;
                return;
            }
        });
        if (shouldReturn) {
            // TODO: send back a "failed to create account" event or somethin
            return;
        }
        let token = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        server.accounts.data.set(token, { username: inter.username, password: inter.password, userType: Account_1.UserType.normal });
        server.accounts.update();
    }
}
exports.CreateAccountRequest = CreateAccountRequest;
