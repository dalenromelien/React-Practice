import { Button, Card, Grid } from "@mui/material"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addEmployee, employee, fetchEmployees } from "./multipleEmployeesSlice";

export const MultipleEmployees = () => {

    const [name, setName] = useState('');
    const [home, setHome] = useState('');
    const [gender, setGender] = useState('');

    const dispatch = useAppDispatch();

	const employees: employee[] = useAppSelector(state => state.employee.employees);

    const onNameChanged = (e: any) => setName(e.target.value);
    const onHomeChanged = (e: any) => setHome(e.target.value);
    const onGenderChanged = (e: any) => setGender(e.target.value);

	//load employees on component mount
	useEffect(() => {
        try{
            dispatch(fetchEmployees());
        }catch(e){
            console.log("encoutnered the following error " + e);
        }
	}, []);

    const userDivs = employees.map((employee: employee) => {
        return (
            <Grid key={employee.name}>
                <Card className="employee-card" >
                    <p>Name: {employee.name}</p>
                    <p>Home: {employee.home}</p>
                    <p>Gender: {employee.gender}</p>
					<Link to={`/employee/${employee.name}`} className="button">
						View Employee
					</Link>
                </Card>
            </Grid>
        )
    });

    const employeeSubmit = () => {
        dispatch(addEmployee({name, home, gender}));
		setName('');
		setHome('');
		setGender('');
    }

    return (
        <div>
            <h1>This is the Multiple Employees List</h1>
            {userDivs}


            <div className="add-employee-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={onNameChanged}/>

                <label htmlFor="home">Home: </label>
                <input type="text" id="home" value={home} onChange={onHomeChanged}/>

                <label htmlFor="gender">Gender: </label>
                <input type="text" id="gender" value={gender} onChange={onGenderChanged}/>
                
                <Button variant="contained" onClick={() => employeeSubmit()}>Add Employee</Button>
            </div>
        </div>
    )
}