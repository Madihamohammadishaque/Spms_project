import React from 'react';
import AdminDashboard from './adminDashboard/AdminDashboard.js';
import AccreditorDashboard from './accreditorDashboard/AccreditorDashboard.js';
import StudentDashboard from './studentDashboard/StudentDashboard.js';
import FacultyDashboard from './facultyDashboard/FacultyDashboard.js';
import ManagementDashboard from './managementDashboard/ManagementDashboard.js';

export default function Dashboard (props) {
  let query = props.location.search;
  console.dir(query);
  let params = new URLSearchParams(query);
  let accountType = params.get('accountType');
  let accountID = params.get('accountID');

  if (accountType === 'Admin') {
    return <AdminDashboard
            accountType={accountType}
            accountID={accountID} 
           />;
  }
  else if (accountType === 'Accreditor') {
    return <AccreditorDashboard
            accountType={accountType}
            accountID={accountID}
            isAuthed={true}
           />;
  }
  else if (accountType === 'Faculty') {
    return <FacultyDashboard
            accountType={accountType}
            accountID={accountID}
            isAuthed={true}
           />;
  }
  else if (accountType === 'Student') {
    return <StudentDashboard
            accountType={accountType}
            accountID={accountID}
            isAuthed={true}
           />;
  }
  else if (accountType === 'Management') {
    return <ManagementDashboard
            accountType={accountType}
            accountID={accountID}
            isAuthed={true}
           />;
  }
}