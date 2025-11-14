import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from './slices/state.slice'



export const store = configureStore({
    reducer: {
        device: deviceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch