import AddSchoolForm from './forms/AddSchoolForm.js';
import SchoolTable from './tables/SchoolTable.js';
export default function ViewAddSchool (props) {
    return (
        <div>
            <h1>View and Add School</h1>
            <AddSchoolForm></AddSchoolForm>
            <br />
            <br />
            <SchoolTable></SchoolTable>
        </div> 
    );
}