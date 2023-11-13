import { DNDEventType } from "./DNDEventType";
import { MessageBase } from "@/messages";

import { Client } from "@/client";

export interface DeleteInterface 
{
    type: DNDEventType
    id: number
}

export class Delete implements DeleteInterface
{
    public type: DNDEventType;
    public id: number;

    constructor(id: number)
    {
        this.type = DNDEventType.delete;
        this.id = id;
    }

    public static doClientSide(inter: DeleteInterface)
    {
        Client.messages.splice(inter.id, 1);
    }
}