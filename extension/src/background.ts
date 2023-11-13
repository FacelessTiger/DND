chrome.runtime.onMessage.addListener((request) => {
    console.log("sending request");
    chrome.tabs.query({
        url: "*://localhost:*/"
    }, (result) => {
        if (result.length == 1) 
        {
            let tab = result[0];
            chrome.tabs.sendMessage(tab.id, request);
        }
    });

    chrome.tabs.query({
        url: "*://facelesstiger.mooo.com/*"
    }, (result) => {
        if (result.length == 1) 
        {
            let tab = result[0];
            chrome.tabs.sendMessage(tab.id, request);
        }
    });
})