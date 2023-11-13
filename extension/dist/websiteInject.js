import { addCustomEventListener } from './dndbeyond/base.js';
addCustomEventListener("Roll", (e) => {
    if (e.type == "DND_Roll") {
        let message = e.detail.message;
        // @ts-ignore
        window.app.sendMessage(message);
    }
});
