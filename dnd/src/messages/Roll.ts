import { MessageBase, MessageType } from "./MessageBase";

export enum RollType
{
    Standard,
    AdvantageDisadvantage
}

export interface IndividualRoll
{
    dice: string;
    type: RollType;
    results: string[];
    total: number;
    primaryIndex: number;
    right: string;
}

export class Roll extends MessageBase
{
    public header: string;
    public author: string;
    public total: number;
    public rolls: IndividualRoll[];
    public color: string;

    constructor(header: string, author: string, total: number, rolls: IndividualRoll[], color: string)
    {
        super();

        this.type = MessageType.Roll;
        this.author = author;
        this.header = header;
        this.total = total;
        this.rolls = rolls;
        this.color = color;
    }
}