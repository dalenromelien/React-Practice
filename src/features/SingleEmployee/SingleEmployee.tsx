import Card from '@mui/material/Card/Card';
import Grid from '@mui/material/Grid/Grid';
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';

export const SingleEmployee = ({ match }: any) => {
    const { employeeId } = useParams();

    const employee = useAppSelector(state => state.employee.employees.find(employee => employee.name === employeeId));

    return (
        <div>
            <h1>Single Employee page with Employee {employeeId}</h1>
            <Grid>
                <Card className="employee-card">
                    <p>Name: {employee?.name}</p>
                    <p>Home: {employee?.home}</p>
                    <p>Gender: {employee?.gender}</p>
                </Card>
            </Grid>
        </div>
    )
}