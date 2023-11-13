import * as fs from 'fs';

function replacer(key: any, value: any) {
    if (value instanceof Map)
    {
        return {
            dataType: 'Map',
            value: Array.from(value.entries())
        };
    }
    else
    {
        return value;
    }
}

function reviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map')
            return new Map(value.value);
    }

    return value;
}

export class Database<Type>
{
    private m_Data: Type[];
    private m_Path: string;

    constructor(path: string)
    {
        this.m_Path = path;

        if (fs.existsSync(path))
        {
            this.m_Data = JSON.parse(fs.readFileSync(path).toString());
        }
        else
        {
            this.m_Data = [];
        }
    }

    public push(t: Type)
    {
        this.m_Data.push(t);
        fs.writeFileSync(this.m_Path, JSON.stringify(this.m_Data));
    }

    public delete(index: number)
    {
        this.m_Data.splice(index, 1);
        fs.writeFileSync(this.m_Path, JSON.stringify(this.m_Data));
    }

    public get data(): Type[]
    {
        return this.m_Data;
    }
}

export class DatabaseSingle<Type>
{
    private m_Data: Type
    private m_Path: string;

    constructor(path: string, defaultType: Type)
    {
        this.m_Path = path;

        if (fs.existsSync(path))
        {
            this.m_Data = JSON.parse(fs.readFileSync(path).toString(), reviver);
        }
        else
        {
            this.m_Data = defaultType;
        }
    }

    public get data(): Type
    {
        return this.m_Data;
    }

    public update()
    {
        fs.writeFileSync(this.m_Path, JSON.stringify(this.m_Data, replacer));
    }
}