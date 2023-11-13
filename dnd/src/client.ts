import * as Events  from "./events"
import { MessageBase } from '@/messages'

import { ref } from 'vue'
import type { Ref } from 'vue'

export class Client
{
    private static m_Socket: WebSocket;
    private static m_Token: Ref<number> = ref(-1);
    private static m_Messages: Ref<MessageBase[]> = ref([] as MessageBase[]);

    private static m_ConnectingPacketQueue = [] as string[];

    public static Init()
    {
        Client.m_Socket = new WebSocket(import.meta.env.DEV ? "ws://localhost:8000" : "ws://50.54.148.144:8000");

        Client.m_Socket.onopen = (e) => {
            for (let packet of this.m_ConnectingPacketQueue)
                Client.m_Socket.send(packet);
        }
        
        Client.m_Socket.onmessage = (e) => {
            let event = JSON.parse(e.data);

            switch (event.type)
            {
                case Events.DNDEventType.message:
                    Events.Message.doClientSide(event);
                    break;
                case Events.DNDEventType.messageHistory:
                    Events.MessageHistory.doClientSide(event);
                    break;
                case Events.DNDEventType.delete:
                    Events.Delete.doClientSide(event);
                    break;
                case Events.DNDEventType.loginSuccessful:
                    Events.LoginSuccessful.doClientSide(event);
                    break;
                default:
                    console.log("Unrecgonized event type " + e.data);
            }
        };
        
        Client.m_Socket.onerror = (e) => { console.log(e); };       
    }

    static get messages() { return Client.m_Messages.value; }
    static set messages(messages: MessageBase[]) { Client.m_Messages.value = messages; }

    static get token() { return Client.m_Token.value; }
    static set token(token: number) { this.m_Token.value = token; }

    public static send(event: any)
    {
        let eventString = JSON.stringify(event);

        if (this.m_Socket.readyState == WebSocket.CONNECTING)
            this.m_ConnectingPacketQueue.push(eventString);
        else
            Client.m_Socket.send(JSON.stringify(event));
    }
}