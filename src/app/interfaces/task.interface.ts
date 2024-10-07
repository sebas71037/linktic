import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { IPerson } from "./person.interface";

export interface ITask {
    taskName: string;
    status: boolean;
    description?: string;
    dueDate?: Date;
    assigneTo?: IPerson;
    update_date?: Date;

    /* Temporal vars */
    id?: number;
}