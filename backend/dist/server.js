"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const ws_1 = require("ws");
const http_1 = require("http");
const Events = __importStar(require("./events"));
const database_1 = require("./database");
class Server {
    constructor(port) {
        this.m_Messages = new database_1.Database("database.db");
        this.m_Accounts = new database_1.DatabaseSingle("accounts.db", new Map());
        const server = (0, http_1.createServer)((req, res) => {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET'
            };
            if (req.method) {
                if (req.method === 'OPTIONS') {
                    res.writeHead(204, headers);
                    res.end();
                    return;
                }
                if (['GET', 'POST'].indexOf(req.method) > -1) {
                    res.writeHead(200, headers);
                    return;
                }
            }
            res.writeHead(405, headers);
            res.end(`${req.method} is not allowed for the request.`);
        });
        this.m_Server = new ws_1.WebSocketServer({ server });
        this.m_Server.on('connection', (ws) => {
            ws.on('error', console.error);
            ws.on('message', (data) => {
                let event = JSON.parse(data.toString());
                console.log(event);
                switch (event.type) {
                    case Events.DNDEventType.message:
                        Events.MessageDNDEvent.doServerSide(event, ws, this);
                        break;
                    case Events.DNDEventType.delete:
                        Events.DeleteDNDEvent.doServerSide(event, ws, this);
                        break;
                    case Events.DNDEventType.loginRequest:
                        Events.LoginRequest.doServerSide(event, ws, this);
                        break;
                    case Events.DNDEventType.createAccountRequest:
                        Events.CreateAccountRequest.doServerSide(event, ws, this);
                        break;
                    case Events.DNDEventType.loginRequestToken:
                        Events.LoginRequestToken.doServerSide(event, ws, this);
                        break;
                    default:
                        console.log("Unrecgonized event type " + event);
                }
            });
        });
        server.listen(port);
    }
    get clients() { return this.m_Server.clients; }
    get messages() { return this.m_Messages; }
    get accounts() { return this.m_Accounts; }
    pushMessage(message) {
        this.m_Messages.push(message);
    }
    deleteMessage(messageID) {
        this.m_Messages.delete(messageID);
    }
    send(event, ws) {
        ws.send(JSON.stringify(event));
    }
}
exports.Server = Server;
