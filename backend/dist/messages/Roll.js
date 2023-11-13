"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roll = exports.RollType = void 0;
const MessageBase_1 = require("./MessageBase");
var RollType;
(function (RollType) {
    RollType[RollType["Standard"] = 0] = "Standard";
    RollType[RollType["AdvantageDisadvantage"] = 1] = "AdvantageDisadvantage";
})(RollType = exports.RollType || (exports.RollType = {}));
class Roll extends MessageBase_1.MessageBase {
    constructor(header, author, total, rolls, color) {
        super();
        this.type = MessageBase_1.MessageType.Roll;
        this.author = author;
        this.header = header;
        this.total = total;
        this.rolls = rolls;
        this.color = color;
    }
}
exports.Roll = Roll;
