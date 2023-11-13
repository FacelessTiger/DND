"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollMessageCompiler = void 0;
const messages_1 = require("./messages");
class StandardDice {
    constructor(sides, numDice) {
        this.right = "";
        this.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        this.sides = sides;
        this.numDice = numDice;
    }
    roll() {
        let results = [];
        let total = 0;
        for (let i = 0; i < this.numDice; i++) {
            let roll = this.randomInt(1, this.sides);
            total += roll;
            results.push(roll.toString());
        }
        let dice = this.numDice + "d" + this.sides;
        return { dice, type: messages_1.RollType.Standard, results, total, primaryIndex: -1, right: this.right };
    }
}
class AdvantageDice extends StandardDice {
    constructor(sides, numDice) {
        super(sides, numDice);
    }
    roll() {
        let results = [];
        let highestRoll = 0;
        let primaryIndex = 0;
        for (let i = 0; i < this.numDice; i++) {
            let roll = this.randomInt(1, this.sides);
            if (roll > highestRoll) {
                highestRoll = roll;
                primaryIndex = i;
            }
            results.push(roll.toString());
        }
        let dice = this.numDice + "d" + this.sides + "kh1";
        return { dice, type: messages_1.RollType.AdvantageDisadvantage, results, total: highestRoll, primaryIndex, right: this.right };
    }
}
class DisadvantageDice extends StandardDice {
    constructor(sides, numDice) {
        super(sides, numDice);
    }
    roll() {
        let results = [];
        let lowestRoll = 9999;
        let primaryIndex = 0;
        for (let i = 0; i < this.numDice; i++) {
            let roll = this.randomInt(1, this.sides);
            if (roll < lowestRoll) {
                lowestRoll = roll;
                primaryIndex = i;
            }
            results.push(roll.toString());
        }
        let dice = this.numDice + "d" + this.sides + "kl1";
        return { dice, type: messages_1.RollType.AdvantageDisadvantage, results, total: lowestRoll, primaryIndex, right: this.right };
    }
}
class RollMessageCompiler {
    constructor(message) {
        this.dice = [];
        message = message.replace(new RegExp("(?<advantage>[0-9]+d[0-9]+kh1)|(?<disadvantage>[0-9]+d[0-9]+kl1)|(?<standard>[0-9]+d[0-9]+)", "g"), (match, g1, g2, g3) => {
            let type;
            (function (type) {
                type[type["standard"] = 0] = "standard";
                type[type["disadvantage"] = 1] = "disadvantage";
                type[type["advantage"] = 2] = "advantage";
            })(type || (type = {}));
            ;
            let matchType = g1 ? type.advantage : g2 ? type.disadvantage : type.standard;
            let parts = match.split("d");
            let numDice = parseInt(parts[0]);
            let sides;
            switch (matchType) {
                case type.standard:
                    sides = parseInt(parts[1]);
                    this.dice.push(new StandardDice(sides, numDice));
                    break;
                case type.advantage:
                    sides = parseInt(parts[1].substring(0, parts[1].indexOf("kh")));
                    this.dice.push(new AdvantageDice(sides, numDice));
                    break;
                case type.disadvantage:
                    sides = parseInt(parts[1].substring(0, parts[1].indexOf("kl")));
                    this.dice.push(new DisadvantageDice(sides, numDice));
                    break;
            }
            return "m";
        });
        let index = 0;
        message += "m";
        message.replace(new RegExp("m.+?(?=m)", "g"), (match) => {
            this.dice[index].right = match.substring("m".length);
            index++;
            return "";
        });
    }
    compile() {
        let rolls = [];
        for (let i = 0; i < this.dice.length; i++) {
            rolls.push(this.dice[i].roll());
        }
        return rolls;
    }
    printRoll(roll) {
        let message = "";
        for (let i = 0; i < roll.rolls.length; i++) {
            message += roll.rolls[i].dice;
            message += roll.rolls[i].right;
        }
        message += " = " + roll.total;
        console.log(message);
    }
    rollsToMathString(rolls) {
        let message = "";
        for (let i = 0; i < rolls.length; i++) {
            message += rolls[i].total;
            message += rolls[i].right;
        }
        return message;
    }
}
exports.RollMessageCompiler = RollMessageCompiler;
;
