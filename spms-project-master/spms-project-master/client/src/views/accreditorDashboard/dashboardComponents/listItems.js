import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventNoteIcon from '@material-ui/icons/EventNote';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SubjectIcon from '@material-ui/icons/Subject';
import Tooltip from '@material-ui/core/Tooltip';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { Link } from 'react-router-dom';

export default function MainListItems (props) { 
  console.dir(props);
  return (
    <div>
      
      <Link to={'/dashboard?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          Dashboard
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Tooltip>
      </Link>

      <Link to={'/dashboard/view-all-course-mapped-co-plo?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View All Courses Mapped to CO and PLO
        </span>}>
          <ListItem button>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="View And Add Courses" />
          </ListItem>
        </Tooltip>
      </Link>{/* Select a Course Title fetched from database and view all the CO and their corresponding PLOs*/}

      <Link to={'/dashboard/view-add-semester?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View And Add Semesters
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="View And Add Semesters" />
          </ListItem>
        </Tooltip>
      </Link>

      <Link to={'/dashboard/view-add-offered-course?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View And Add Offered Courses
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary="View And Add Offered Courses" />
          </ListItem>
        </Tooltip>
      </Link> {/* Add a place to add number of sections for an offered course and assign a course instructor to the course */}

      <Link to={'/dashboard/view-students?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View Students
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="View and Add Students" />
          </ListItem>
        </Tooltip>
      </Link>

      <Link to={'/dashboard/view-faculties?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View Faculty
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="View and Add Faculty" />
          </ListItem>
        </Tooltip>
      </Link>

      <Link to={'/dashboard/add-new-account?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          Add A New Account
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Other Accounts (Admin, Management, Accreditors)" />
          </ListItem>
          </Tooltip>
      </Link>

      <Link to={'/dashboard/view-add-school?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View And Add School
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="View And Add School" />
          </ListItem>
          </Tooltip>
      </Link> 
      
      <Link to={'/dashboard/view-add-dept?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View And Add Departments
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="View And Add Departments" />
          </ListItem>
          </Tooltip>
      </Link> 

      <Link to={'/dashboard/view-add-degree-programs?accountType=' + props.accountType + '&accountID=' + props.accountID}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View And Add Degree Programs
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="View And Add Degree Programs" />
          </ListItem>
          </Tooltip>
      </Link> {/* Add a place to add degree programs under a dept */}
    </div>
  );
}

/*export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);*/
