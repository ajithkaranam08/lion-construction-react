import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";
import toast from "react-hot-toast";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null
    },
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            toast.success("Login successful!");
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            toast.error("Login failed!");
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            toast.success("Logged out successfully!");
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ...action.payload.auth,
                };
            })
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    logout, 
    clearError 
} = authSlice.actions;

export default authSlice.reducer;