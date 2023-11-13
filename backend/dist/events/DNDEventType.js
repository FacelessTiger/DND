"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNDEventType = void 0;
var DNDEventType;
(function (DNDEventType) {
    DNDEventType[DNDEventType["None"] = 0] = "None";
    DNDEventType[DNDEventType["message"] = 1] = "message";
    DNDEventType[DNDEventType["messageHistory"] = 2] = "messageHistory";
    DNDEventType[DNDEventType["delete"] = 3] = "delete";
    DNDEventType[DNDEventType["loginRequest"] = 4] = "loginRequest";
    DNDEventType[DNDEventType["createAccountRequest"] = 5] = "createAccountRequest";
    DNDEventType[DNDEventType["loginSuccessful"] = 6] = "loginSuccessful";
    DNDEventType[DNDEventType["loginRequestToken"] = 7] = "loginRequestToken";
})(DNDEventType = exports.DNDEventType || (exports.DNDEventType = {}));
