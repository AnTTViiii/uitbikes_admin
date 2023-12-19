import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthed: localStorage.getItem("admin") != null,
    admin: JSON.parse(localStorage.getItem("admin")) || null,
};

const AuthSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setAuth(state, action) {
            state.isAuthed = true;
            state.admin = action.payload;
            localStorage.setItem("admin", JSON.stringify(action.payload));
            setTimeout(() => {
                localStorage.removeItem("admin");
            }, 24*60*60*1000);
        },
        logout(state) {
            state.isAuthed = false;
            state.admin = null;
            localStorage.removeItem("admin");
        },
    },
});

export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;