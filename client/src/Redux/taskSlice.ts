import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../Components/Board/taskReducer";
import axios from "axios";

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetchTasks", async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=12");
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
)

interface TaskStatus {
    entities: Task[];
    status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: TaskStatus = {
    entities: [],
    status: "idle",
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
            state.entities = action.payload;
            state.status = "succeeded";
        });
        builder.addCase(fetchTasks.rejected, (state) => {
            state.status = "failed";
        });
    }
});

export default tasksSlice.reducer;