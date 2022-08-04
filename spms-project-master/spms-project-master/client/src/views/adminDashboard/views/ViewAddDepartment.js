import AddDepartmentForm from './forms/AddDepartmentForm.js';
import DepartmentTable from './tables/DepartmentTable.js';
export default function ViewAddDepartment (props) {
    return (
        <div>
            <h1>View and Add Departments</h1>
            <AddDepartmentForm></AddDepartmentForm>
            <br />
            <br />
            <DepartmentTable></DepartmentTable>
        </div>
    );
}