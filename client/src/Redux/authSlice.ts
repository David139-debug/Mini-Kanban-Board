import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

type Status = "idle" | "pending" | "fulfilled" | "failed";

export type FormFieldName = "fullname" | "email" | "password";

export interface FormData {
    fullname?: string;
    email: string;
    password: string;
}

interface AuthState {
    formData: FormData;
    status: Status;
    error: string | null;
}

const initialState: AuthState = {
    formData: {
        fullname: "",
        email: "",
        password: ""
    },
    status: "idle",
    error: null
}

export const registerUser = createAsyncThunk<FormData, FormData>("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post("http://localhost:5000/api/register", userData);
        const data = response.data;

        const refreshToken = data.refreshToken;
        const accessToken = data.accessToken;
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken);

        return data;
    } catch (err:any) {
        return rejectWithValue(err.response.data.message)
    }
});

export const loginUser = createAsyncThunk<FormData, FormData>("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post("http://localhost:5000/api/login", userData);
        const data = response.data;
        
        const refreshToken = data.refreshToken;
        const accessToken = data.accessToken;
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken);
        
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response.data.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
            state.status = "pending";
            state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "fulfilled",
                state.formData = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(loginUser.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "fulfilled",
                state.formData = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed",
                state.error = action.payload as string
            })

    }
});

export default authSlice.reducer;