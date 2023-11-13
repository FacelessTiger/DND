"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSuccessful = void 0;
const DNDEventType_1 = require("./DNDEventType");
class LoginSuccessful {
    constructor(token, rememberMe) {
        this.type = DNDEventType_1.DNDEventType.loginSuccessful;
        this.token = token;
        this.rememberMe = rememberMe;
    }
}
exports.LoginSuccessful = LoginSuccessful;
