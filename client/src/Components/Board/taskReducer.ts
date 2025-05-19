import type { Status } from "./NewTaskModal/NewTask";

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    status: Status;
}

export interface OpenModal {
    isOpened: false;
}

export type Action =
    | { type: "GET_TASKS", payload: { tasks: Task[] } }
    | { type: "MOVE_TASK", payload: { taskId: string, newStatus: "todo" | "inProgress" | "done"} }
    | { type: "ADD_TASK", payload: { id: string, title: string, newStatus: Status, completed: false | true  } }
    | { type: "DELETE_TASK", payload: { id: string } }
    | { type: "EDIT_TASK", payload: { title: string, id: string } }

export const taskReducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case "GET_TASKS":
            return action.payload.tasks;
        
        case "MOVE_TASK":
            return state.map(task => 
                task.id === action.payload.taskId ?
                { ...task, status: action.payload.newStatus }
                : task
            )

        case "ADD_TASK":
            const newTask: Task = {
                id: action.payload.id,
                title: action.payload.title,
                completed: action.payload.completed,
                status: action.payload.newStatus
            };
            return [...state, newTask];

        case "EDIT_TASK":
            return state.map(task => task.id === action.payload.id
                ? { ...task, title: action.payload.title }
                : task
            );
            

        case "DELETE_TASK":
           return state.filter(task => task.id !== action.payload.id);

        default: 
            return state
    }
}