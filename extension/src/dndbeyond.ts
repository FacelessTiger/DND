(async () => {
    const src = chrome.runtime.getURL('dist/dndbeyond/base.js');
    return await import(src);
})().then((src) => {
    src.addCustomEventListener("Roll", (message) => {
        console.log("Sending " + message);
        chrome.runtime.sendMessage({ data: [JSON.stringify({ type: message.type, data: message.detail })] });
    });
})

let s = document.createElement("script");
s.src = chrome.runtime.getURL("libs/jquery-3.7.0.min.js");
(document.head || document.documentElement).appendChild(s);
s.onload = function() 
{
    s.parentNode.removeChild(s);

    s = document.createElement("script");
    s.type = "module";
    s.src = chrome.runtime.getURL("dist/dndcharacter.js");
    (document.head || document.documentElement).appendChild(s);
    s.onload = function() { s.parentNode.removeChild(s); }
}

/*addCustomEventListener("Roll", (message: String) => {
    chrome.runtime.sendMessage({ message: message });
});*/