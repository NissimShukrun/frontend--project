import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/types";

interface UserState {
  user: User | null;
  message?: string;
}

const initialState: UserState = {
  user: null,
  message: undefined,
};

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (userData: { name: string; email: string; password: string }) => {
    const response = await fetch(`http://localhost:5000/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
  }
);

export const fetchLoginUser = createAsyncThunk(
  "auth/fetchLoginUser",
  async (userData: { email: string; password: string }) => {
    const response = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to login user");
    return response.json();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload.returnUser;
        state.message = action.payload.message;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
      });
  },
});

export default authSlice.reducer;
