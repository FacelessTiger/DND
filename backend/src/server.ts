import { WebSocketServer, WebSocket, RawData, Data } from 'ws';
import { createServer } from 'http'
import { readFileSync } from 'fs';

import * as Events from "./events"
import { MessageBase, Message, MessageType, Error, Roll, IndividualRoll, RollType } from './messages';
import { Account } from './Account';
import { Database, DatabaseSingle } from './database';

export class Server
{
    private m_Server: WebSocketServer;
    private m_Messages: Database<MessageBase> = new Database<MessageBase>("database.db");
    private m_Accounts: DatabaseSingle<Map<number, Account>> = new DatabaseSingle<Map<number, Account>>("accounts.db", new Map<number, Account>());

    constructor(port: number)
    {
        const server = createServer((req, res) => {
            const headers =
            {
                'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
                'Access-Control-Allow-Methods': 'POST, GET'
            };
            
            if (req.method)
            {
                if (req.method === 'OPTIONS')
                {
                    res.writeHead(204, headers);
                    res.end();
                    return;
                }

                if (['GET', 'POST'].indexOf(req.method) > -1) 
                {
                    res.writeHead(200, headers);
                    return;
                }
            }

            res.writeHead(405, headers);
            res.end(`${req.method} is not allowed for the request.`);
        });

        this.m_Server = new WebSocketServer({ server });
        this.m_Server.on('connection', (ws) => {
            ws.on('error', console.error);
            
            ws.on('message', (data) => {
                let event = JSON.parse(data.toString());

                console.log(event);
                switch (event.type)
                {
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

    get clients() { return this.m_Server.clients }
    get messages() { return this.m_Messages; }
    get accounts() { return this.m_Accounts; }

    public pushMessage(message: MessageBase)
    {
        this.m_Messages.push(message);
    }

    public deleteMessage(messageID: number)
    {
        this.m_Messages.delete(messageID);
    }

    public send(event: any, ws: WebSocket)
    {
        ws.send(JSON.stringify(event));
    }
}