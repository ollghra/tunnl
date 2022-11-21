import { ActionStatus, Bullet, Question, Task } from "../types/Bullet";
import { ScheduleTime } from "../types/Time";
import { Separator } from "./Separator";
import { X, Dot, Exclamation} from "react-bootstrap-icons";

export class Slot {
    start: ScheduleTime;
    end: ScheduleTime;
    bullet: Bullet;
    constructor(start: ScheduleTime, end: ScheduleTime, bullet: Bullet) {
        this.start = start;
        this.end = end;
        this.bullet = bullet;
    }
}

export const Section = (props: {
    title: string;
    items: Array<Slot | Bullet | string>;
}) => {
    return <div>
        <Separator title={props.title} />
        {
            props.items.map((s, si) =>
                <div key={si}>
                    {
                        s instanceof Slot ?
                            <>
                                <div>
                                    <div>{s.start.toString()}</div>
                                    <div>{s.end.toString()}</div>
                                </div>
                                <div>{s.bullet.text}</div>
                            </>
                            : s instanceof Bullet ?
                            <div>
                                {s instanceof Task ? <span><button>{s.status===ActionStatus.DONE?<X/>:<Dot/>}</button>
                                <button>{s.important?<Exclamation/>:''}</button></span>:
                                s instanceof Question ? <span>Q:{s.to.text}</span>: ''}
                                &nbsp;
                                {s.text}
                            </div> : typeof s === 'string' ?
                            <div>{s}</div> : ''
                    }
                </div>

            )
        }
    </div>
}