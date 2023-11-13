chrome.runtime.onMessage.addListener((request) => {
    let event = JSON.parse(request.data);
    let customEvent = new CustomEvent(event.type, { detail: event.data });
    document.dispatchEvent(customEvent);
});
let script = document.createElement("script");
script.src = chrome.runtime.getURL("libs/jquery-3.7.0.min.js");
(document.head || document.documentElement).appendChild(script);
script.onload = function () {
    script.parentNode.removeChild(script);
    script = document.createElement("script");
    script.type = "module";
    script.src = chrome.runtime.getURL("dist/websiteInject.js");
    (document.head || document.documentElement).appendChild(script);
    script.onload = function () { script.parentNode.removeChild(script); };
};
