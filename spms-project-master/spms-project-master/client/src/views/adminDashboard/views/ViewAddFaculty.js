import AddFacultyForm from './forms/AddFacultyForm.js';
import FacultyTable from './tables/FacultyTable.js';
export default function ViewAddFaculty (props) {
    return (
        <div>
            <h1>View and Add Faculty</h1>
            <AddFacultyForm></AddFacultyForm>
            <br />
            <br />
            <FacultyTable />
        </div>
    );
}