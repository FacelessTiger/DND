import { IndividualRoll, Roll, RollType } from "./messages";

class StandardDice
{
    public sides: number;
    public numDice: number;
    public right: string = "";

    protected randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    constructor(sides: number, numDice: number)
    {
        this.sides = sides;
        this.numDice = numDice;
    }

    public roll(): IndividualRoll
    {
        let results = [] as string[];

        let total = 0;
        for (let i = 0; i < this.numDice; i++)
        {
            let roll = this.randomInt(1, this.sides);
            total += roll;
            results.push(roll.toString());
        }

        let dice = this.numDice + "d" + this.sides;
        return { dice, type:RollType.Standard, results, total, primaryIndex:-1, right:this.right };
    }
}

class AdvantageDice extends StandardDice
{
    constructor(sides: number, numDice: number)
    {
        super(sides, numDice);
    }

    public roll(): IndividualRoll
    {
        let results = [] as string[];

        let highestRoll = 0;
        let primaryIndex = 0;

        for (let i = 0; i < this.numDice; i++)
        {
            let roll = this.randomInt(1, this.sides);
            if (roll > highestRoll)
            {
                highestRoll = roll;
                primaryIndex = i;
            }

            results.push(roll.toString());
        }

        let dice = this.numDice + "d" + this.sides + "kh1";
        return { dice, type:RollType.AdvantageDisadvantage, results, total:highestRoll, primaryIndex, right:this.right };
    }
}

class DisadvantageDice extends StandardDice
{
    constructor(sides: number, numDice: number)
    {
        super(sides, numDice);
    }

    public roll(): IndividualRoll
    {
        let results = [] as string[];

        let lowestRoll = 9999;
        let primaryIndex = 0;

        for (let i = 0; i < this.numDice; i++)
        {
            let roll = this.randomInt(1, this.sides);
            if (roll < lowestRoll)
            {
                lowestRoll = roll;
                primaryIndex = i;
            }

            results.push(roll.toString());
        }

        let dice = this.numDice + "d" + this.sides + "kl1";
        return { dice, type:RollType.AdvantageDisadvantage, results, total:lowestRoll, primaryIndex, right:this.right };
    }
}

export class RollMessageCompiler
{
    public dice = [] as StandardDice[];

    constructor(message: string)
    {
        message = message.replace(new RegExp("(?<advantage>[0-9]+d[0-9]+kh1)|(?<disadvantage>[0-9]+d[0-9]+kl1)|(?<standard>[0-9]+d[0-9]+)", "g"), (match, g1, g2, g3) => {
            enum type { standard, disadvantage, advantage };
            let matchType = g1 ? type.advantage : g2 ? type.disadvantage : type.standard;

            let parts = match.split("d");
            let numDice = parseInt(parts[0]);
            let sides: number;

            switch (matchType)
            {
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

    public compile(): IndividualRoll[]
    {
        let rolls = [] as IndividualRoll[];
        for (let i = 0; i < this.dice.length; i++)
        {
            rolls.push(this.dice[i].roll());
        }

        return rolls;
    }

    public printRoll(roll: Roll): void
    {
        let message = "";

        for (let i = 0; i < roll.rolls.length; i++)
        {
            message += roll.rolls[i].dice;
            message += roll.rolls[i].right;
        }

        message += " = " + roll.total;
        console.log(message);
    }

    public rollsToMathString(rolls: IndividualRoll[]): string
    {
        let message = "";
        for (let i = 0; i < rolls.length; i++)
        {
            message += rolls[i].total;
            message += rolls[i].right;
        }

        return message;
    }
};