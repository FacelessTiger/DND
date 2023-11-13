"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDNDEvent = void 0;
const DNDEventType_1 = require("./DNDEventType");
class DeleteDNDEvent {
    constructor(id) {
        this.type = DNDEventType_1.DNDEventType.delete;
        this.id = id;
    }
    static doServerSide(inter, ws, server) {
        let e = new DeleteDNDEvent(inter.id);
        server.deleteMessage(e.id);
        for (let client of server.clients)
            server.send(e, client);
    }
}
exports.DeleteDNDEvent = DeleteDNDEvent;
