import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthed: localStorage.getItem("user") != null,
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const AuthSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setAuth(state, action) {
            state.isAuthed = true;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            setTimeout(() => {
                localStorage.removeItem("user");
            }, 24*60*60*1000);
        },
        logout(state) {
            state.isAuthed = false;
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;