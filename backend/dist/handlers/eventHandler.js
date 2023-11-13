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
exports.eventHandler = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getAllFiles(directory, foldersOnly = false) {
    let fileNames = [];
    const files = fs.readdirSync(directory, { withFileTypes: true });
    for (const file of files) {
        const filePath = path.join(directory, file.name);
        if (foldersOnly) {
            if (file.isDirectory())
                fileNames.push(filePath);
        }
        else {
            if (file.isFile())
                fileNames.push(filePath);
        }
    }
    return fileNames;
}
function eventHandler() {
    const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        console.log(eventFiles);
    }
    console.log(eventFolders);
}
exports.eventHandler = eventHandler;
