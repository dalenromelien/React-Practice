import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type employee = {
    name: string,
    home: string,
    gender: string
}
type InitialState = {
    employees: employee[],
    isLoading: boolean,
    error: string
}

const initialState: InitialState = {
    employees: [{name: "Dalen", home: "Bronx", gender: "Male"}],
    isLoading: false,
    error: ''
};

export const fetchEmployees = createAsyncThunk('multipleEmployee/fetchEmployees', async () => {
    return await axios.get('https://swapi.dev/api/people/')
    .then((response) => response.data);
});

const multipleEmployeeSlice = createSlice({
    name: "multipleEmployee",
    initialState: initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<employee>) => {
            state.employees.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchEmployees.fulfilled, (state, action:PayloadAction<any>) => {
            const employeeList: employee[] = [];

            action.payload.results.map((entry: any) => {
                employeeList.push({
                    name: entry.name,
                    home: entry.homeworld,
                    gender: entry.gender
                });
            })

            state.isLoading = false;
            state.employees = employeeList;
            state.error = '';
        });
        builder.addCase(fetchEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.employees = [];
            state.error = action.error.message || 'Request Failed';
        })
    }
});

export const {addEmployee} = multipleEmployeeSlice.actions;

export default multipleEmployeeSlice.reducer;