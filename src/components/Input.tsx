import React, { useEffect, useState } from "react";
import { WFW } from "../pages/HomePage";

const bullets_raw = [
    '2022-11-18 18:00 Q:Tiarnach what is the donkey doing @Tom',
    '2022-12-10 17:00 D: Business plan submission #business_plan_crew',
    '22.11 : Finish first draft of business plan #business_plan_crew',
    'Schedule meeting #tiarnach x #marysol',
    '- how to create *differentiated* value for customers ',
    'E:Mark_O_Sullivan will talk with someone high up in HR in his former company. Recorded on 2022-11-17'
];

export const Input = ({ onSave }: {
    onSave: (newWfw: WFW) => void
}) => {
    const [what, setWhat] = useState<string>('');
    const [when, setWhen] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({what, when});
        setWhat('');
        setWhen('');
    }
    return <div>
        <div>
            <i>
                {what !== undefined && `WHAT: ${what} `}
                {when !== undefined && `WHEN: ${when} `}
            </i>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
            <input type="text" value={what} onChange={(e)=>setWhat(e.target.value)}/>
            <input type="date" value={when} onChange={(e)=>setWhen(e.target.value)}/>
                <input type='submit' value='Send'/></div>
        </form>
    </div>
}