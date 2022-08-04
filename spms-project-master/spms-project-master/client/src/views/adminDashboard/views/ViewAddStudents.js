import AddStudentForm from './forms/AddStudentForm.js';
import StudentTable from './tables/StudentTable.js';
export default function ViewAddStudents (props) {
    return (
        <div>
            <h1>View and Add Students</h1>
            <AddStudentForm></AddStudentForm>
            <br />
            <br />
            <StudentTable></StudentTable>
        </div>
    );
}