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
exports.DatabaseSingle = exports.Database = void 0;
const fs = __importStar(require("fs"));
function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries())
        };
    }
    else {
        return value;
    }
}
function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map')
            return new Map(value.value);
    }
    return value;
}
class Database {
    constructor(path) {
        this.m_Path = path;
        if (fs.existsSync(path)) {
            this.m_Data = JSON.parse(fs.readFileSync(path).toString());
        }
        else {
            this.m_Data = [];
        }
    }
    push(t) {
        this.m_Data.push(t);
        fs.writeFileSync(this.m_Path, JSON.stringify(this.m_Data));
    }
    delete(index) {
        this.m_Data.splice(index, 1);
        fs.writeFileSync(this.m_Path, JSON.stringify(this.m_Data));
    }
    get data() {
        return this.m_Data;
    }
}
exports.Database = Database;
class DatabaseSingle {
    constructor(path, defaultType) {
        this.m_Path = path;
        if (fs.existsSync(path)) {
            this.m_Data = JSON.parse(fs.readFileSync(path).toString(), reviver);
        }
        else {
            this.m_Data = defaultType;
        }
    }
    get data() {
        return this.m_Data;
    }
    update() {
        fs.writeFileSync(this.m_Path, JSON.stringify(this.m_Data, replacer));
    }
}
exports.DatabaseSingle = DatabaseSingle;
