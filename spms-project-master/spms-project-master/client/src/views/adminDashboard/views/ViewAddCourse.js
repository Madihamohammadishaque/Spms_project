import AddCourseForm from './forms/AddCourseForm.js';
import CourseTable from './tables/CourseTable.js';
export default function ViewAddCourse (props) {
    return (
        <div>
            <h1>View and Add a Course</h1>
            <AddCourseForm></AddCourseForm>
            <br />
            <br />
            <CourseTable></CourseTable>
        </div>
    );
}