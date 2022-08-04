import AddSemesterForm from './forms/AddSemesterForm.js';
import SemesterTable from './tables/SemesterTable.js';
export default function ViewAddSemester (props) {
    return (
        <div>
            <h1>View and Add Semester</h1>
            <AddSemesterForm></AddSemesterForm>
            <br />
            <br />
            <SemesterTable></SemesterTable>
        </div>
    );
}