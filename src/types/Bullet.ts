export enum BulletType {
    TASK, QUESTION, PERSON, EVENT, DEADLINE, RESEARCH
}

export abstract class Bullet {
    text: string;
    constructor(text: string) {
        this.text = text;
    }
}

export enum ActionStatus {
    OPEN, TODO, DONE
}
export abstract class ActionBullet extends Bullet {
    important: boolean = false;
    status: ActionStatus = ActionStatus.OPEN;
    constructor(text: string, important: boolean = false, status: ActionStatus = ActionStatus.OPEN) {
        super(text);
        this.important = important;
        this.status = status;
    }
}

/* Bullet types */
export class Task extends ActionBullet {
    constructor(text: string, important?: boolean, status?: ActionStatus){
        super(text, important, status);
    }
}
export class Question extends ActionBullet {
    to: Person;
    constructor(text:string, to: Person) {
        super(text);
        this.to = to;
    }
}
export interface Deadline extends ActionBullet {
    date: Date;
}
export class Research extends ActionBullet {
}
export class Person extends Bullet {
}
export class EventBullet extends Bullet {
}