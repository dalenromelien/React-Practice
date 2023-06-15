import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/MultipleEmployees/multipleEmployeesSlice";

export const store = configureStore({
    reducer: {
        employee: employeeReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch