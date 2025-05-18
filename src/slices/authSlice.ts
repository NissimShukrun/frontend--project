import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/types";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async () => {
    const response = await fetch(`http://localhost:5000/auth/register`);
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
  }
);

export const fetchLoginUser = createAsyncThunk(
  "auth/fetchLoginUser",
  async () => {
    const response = await fetch(`http://localhost:5000/auth/login`);
    if (!response.ok) throw new Error("Failed to login user");
    return response.json();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
