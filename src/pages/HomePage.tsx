import { useState } from "react"
import { InputBar } from "../components/InputBar"
import { Slot, Section } from "../components/Section"
import { Separator } from "../components/Separator"
import { ActionStatus, EventBullet, Person, Question, Task } from "../types/Bullet"
import { ScheduleTime } from "../types/Time"

const bulletSlots: Array<Slot> = [
    new Slot(new ScheduleTime('530'), new ScheduleTime('730'), new EventBullet('Morning with MTU')),
    new Slot(new ScheduleTime('10'), new ScheduleTime('13'),  { text: 'Leadership for Entrepreneurs' }),
    new Slot(new ScheduleTime('14'), new ScheduleTime('17'), { text: 'Building boards - advisory'}),
    new Slot(new ScheduleTime('2030'), new ScheduleTime('2115'), { text: 'Eofis x Learnovate preparation'})
]

const bullets: Array<Task> = [
    new Task('Bring blankets', true),
    new Question('Pulse survey experience', new Person('Sophie'))
]

export const HomePage = () => {
    const [bulletsRaw, setBulletsRaw] = useState<string[]>([]);
    
    return <div>
        30 D.F.
        <Section title='Schedule' items={bulletSlots}/>
        <Section title='TODO' items={bullets}/>
        <Separator title='Completed'/>
        <Section title='Backlog' items={bulletsRaw}/>
        <InputBar onSave={(bulletLine) => setBulletsRaw([...bulletsRaw, bulletLine])}/>
    </div>
}