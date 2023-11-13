import { DNDEventType } from "./DNDEventType";
import { Server } from "../server";

import WebSocket from "ws";

export interface DeleteDNDEventInterface 
{
    type: DNDEventType
    id: number
}

export class DeleteDNDEvent implements DeleteDNDEventInterface
{
    public type: DNDEventType;
    public id: number;

    constructor(id: number)
    {
        this.type = DNDEventType.delete;
        this.id = id;
    }

    public static doServerSide(inter: DeleteDNDEventInterface, ws: WebSocket, server: Server)
    {
        let e = new DeleteDNDEvent(inter.id);
        server.deleteMessage(e.id);

        for (let client of server.clients)
            server.send(e, client);
    }
}