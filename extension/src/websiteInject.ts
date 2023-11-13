import { addCustomEventListener } from './dndbeyond/base.js'

addCustomEventListener("Roll", (e) => {
    if (e.type == "DND_Roll")
    {
        let message: string = e.detail.message;
        // @ts-ignore
        window.app.sendMessage(message);
    }
});