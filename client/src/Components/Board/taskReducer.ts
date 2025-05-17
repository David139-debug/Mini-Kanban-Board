type Status = "todo" | "inProgress" | "done";

export interface Task {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    status: Status;
}

export interface OpenModal {
    isOpened: false;
}

export type Action =
    | { type: "GET_TASKS", payload: { tasks: Task[] } }
    | { type: "MOVE_TASK", payload: { taskId: number, newStatus: "todo" | "inProgress" | "done"} }
    | { type: "ADD_TASK", payload: { title: string, newStatus: "todo", completed: false  } }

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
            const newId = state.length > 0 ? Math.max(...state.map(task => task.id)) + 1 : 1;
            const newTask: Task = {
                id: newId,
                userId: 1,
                title: action.payload.title,
                completed: action.payload.completed,
                status: action.payload.newStatus
            };
            return [...state, newTask];

        default: return state
    }
}