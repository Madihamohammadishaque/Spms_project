import AddDegreeProgramForm from './forms/AddDegreeProgramForm.js';
import DegreeProgramTable from './tables/DegreeProgramTable.js';
export default function ViewAddDegreeProgram (props) {
    return (
        <div>
            <h1>View and Add Degree Program</h1>
            <AddDegreeProgramForm></AddDegreeProgramForm>
            <br />
            <br />
            <DegreeProgramTable></DegreeProgramTable>
        </div>
    );
}