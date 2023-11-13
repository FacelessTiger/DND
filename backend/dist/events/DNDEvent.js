"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNDEvent = exports.DNDEventType = void 0;
var DNDEventType;
(function (DNDEventType) {
    DNDEventType[DNDEventType["None"] = 0] = "None";
    DNDEventType[DNDEventType["message"] = 1] = "message";
    DNDEventType[DNDEventType["messageHistory"] = 2] = "messageHistory";
    DNDEventType[DNDEventType["delete"] = 3] = "delete";
})(DNDEventType = exports.DNDEventType || (exports.DNDEventType = {}));
class DNDEvent {
    constructor() {
        this.type = DNDEventType.None;
    }
}
exports.DNDEvent = DNDEvent;
