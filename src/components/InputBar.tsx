import React, { useEffect, useState } from "react";

const bullets_raw = [
    '2022-11-18 18:00 Q:Tiarnach what is the donkey doing @Tom',
    '2022-12-10 17:00 D: Business plan submission #business_plan_crew',
    '22.11 : Finish first draft of business plan #business_plan_crew',
    'Schedule meeting #tiarnach x #marysol',
    '- how to create *differentiated* value for customers ',
    'E:Mark_O_Sullivan will talk with someone high up in HR in his former company. Recorded on 2022-11-17'
];

const line_regex = /^( *((\d{2}\d{2}?)[-\.])?\d\d[-\.]\d\d)? *(\b(\d?\d(:\d\d)?)\b)? *((\b[LQRPED]+\b)?([:-])(\w+)?)?(.*)$/gm;
const r_context = /#(\w+)/g
const r_owner = /@(\w+)/
export const InputBar = ({ onSave }: {
    onSave: (bulletLine: string) => void
}) => {
    const [bulletLine, setBulletLine] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>();
    const [dueTime, setDueTime] = useState<string>();
    const [bulletType, setBulletType] = useState<string>();
    const [bulletRootType, setBulletRootType] = useState<string>();
    const [target, setTarget] = useState<string>();
    const [text, setText] = useState<string>();
    const [contexts, setContexts] = useState<string[]>();
    const [owner, setOwner] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBulletLine(e.target.value);
        const bullet_groups = line_regex.exec(e.target.value);
        if (bullet_groups === null)
            return;
        setDueDate(bullet_groups.at(1));
        setDueTime(bullet_groups.at(5));
        setBulletType(bullet_groups.at(8));
        setBulletRootType(bullet_groups.at(9));
        setTarget(bullet_groups.at(10));
        const _text = bullet_groups.at(11) || '';
        setText(_text);
        setContexts(_text.match(r_context) || []);
        setOwner(r_owner.exec(_text)?.at(1));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(bulletLine);
        setBulletLine('');
    }
    return <div>
        <div>
            <i>
                {dueDate !== undefined && `DUE DATE: ${dueDate} `}
                {dueTime !== undefined && `DUE TIME: ${dueTime} `}
                {bulletType !== undefined && `BULLET TYPE: ${bulletType} `}
                {bulletRootType !== undefined && `BULLET ROOT TYPE: ${bulletRootType} `}
                {target !== undefined && `TARGET: ${target} `}
                {text !== undefined && `TEXT: ${text} `}
                {contexts !== undefined && `CONTEXT: ${contexts} `}
                {owner !== undefined && `OWNER: ${owner} `}
            </i>
        </div>
        <form onSubmit={handleSubmit}>
            <div><input type="text" value={bulletLine} onChange={handleChange}/><input type='submit' value='Send'/></div>
        </form>
    </div>
}