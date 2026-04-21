import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import accessReducer from "./accessSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAccess: accessReducer,
  },
})

// 类型推导
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
