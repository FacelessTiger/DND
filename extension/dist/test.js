var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => __awaiter(this, void 0, void 0, function* () {
    const src = chrome.runtime.getURL('dist/dndbeyond/base.js');
    return yield import(src);
}))().then((src) => {
    src.addCustomEventListener("Roll", (message) => {
        chrome.runtime.sendMessage(message);
    });
});
let s = document.createElement("script");
s.src = chrome.runtime.getURL("libs/jquery-3.7.0.min.js");
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
    s.parentNode.removeChild(s);
    s = document.createElement("script");
    s.type = "module";
    s.src = chrome.runtime.getURL("dist/dndcharacter.js");
    (document.head || document.documentElement).appendChild(s);
    s.onload = function () { s.parentNode.removeChild(s); };
};
/*addCustomEventListener("Roll", (message: String) => {
    chrome.runtime.sendMessage({ message: message });
});*/ 
