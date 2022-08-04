import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from  'dateformat';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

let deptList = [];
let degreeProgramList = [];

class AddStudentForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            accountID: 0,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            accountType: 'Student',
            major: '',
            deptID: '',
            dateOfAdmission: new Date('2014-08-18T21:11:54'),
            studentType: '',
            deptList: [],
            degreeProgramList: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateOfAdmissionChange = this.handleDateOfAdmissionChange.bind(this);
        this.handleDeptIDSelectChange = this.handleDeptIDSelectChange.bind(this);
        this.handleStudentTypeSelectChange = this.handleStudentTypeSelectChange.bind(this);
        this.handleMajorSelectChange = this.handleMajorSelectChange.bind(this);
    }

    async loadDegreeProgram () {
        let { data }= await axios.get('/api/get/degreeprogram');
        console.dir(data);
        this.setState ({ degreeProgramList: data.response });
        degreeProgramList = this.state.degreeProgramList;
        console.log(degreeProgramList);   
    }

    async loadDepartment () {
        let { data } = await axios.get('/api/get/department');
        console.dir(data);
        this.setState ({ deptList: data.response });
        deptList = this.state.deptList;
        console.log(deptList);
    }

    async componentDidMount () {
        this.loadDepartment();
        this.loadDegreeProgram();
        this.forceUpdate();
    }

    handleChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    handleSubmit (event) {
        event.preventDefault();

        const studentData = this.state;

        const sAccountID = this.state.accountID;
        const sDeptID = this.state.deptID;
        const sDateOfAdmission = this.state.dateOfAdmission;
        const sMajor = this.state.major;
        const studentType = this.state.studentType;

        const studentTableData = {
            sAccountID,
            sDeptID,
            sDateOfAdmission,
            sMajor,
            studentType
        };

        // Use api to insert data into semester table
        this.submitFormData(studentData, studentTableData);
        this.setState({
            accountID: 0,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            accountType: 'Student',
            major: '',
            deptID: '',
            dateOfAdmission: new Date('2014-08-18T21:11:54'),
            studentType: '',
        });
    }  

    
    handleDeptIDSelectChange (event) {
        this.setState({
            deptID: event.target.value
        });
    }

    handleMajorSelectChange (event) {
        this.setState({
            major: event.target.value
        });
    }

    handleDateOfAdmissionChange (event) {
        console.dir(event);
        this.setState({
            dateOfAdmission: dateFormat(event, "isoDate")
        });
    }

    handleStudentTypeSelectChange (event) {
        console.dir(event);
        this.setState({
            studentType: event.target.value
        });
    }

    submitFormData = async (studentData, studentTableData) => {
        let response = await axios.post(
            '/api/put/studentaccount',
            studentData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Account Data Entered.')  {
            console.log('Account Data entered')
        }
        
        response = await axios.post(
            '/api/put/student',
            studentTableData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Student Data Entered.')  {
            console.log('Student Data entered')
        }
    }

    render () {
        const classes = useStyles;
        let successMessage = this.props.successMessage;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>

                        <Typography component="h1" variant="h5">
                            Add a Student
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="accountID"
                                label="Account ID"
                                name="accountID"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoFocus
                                onChange={this.handleChange}
                            /> 
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
                                autoFocus
                                onChange={this.handleChange}
                            /> 
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoFocus
                                onChange={this.handleChange}
                            /> 
                            <TextField
                                fullWidth
                                required
                                id="deptID"
                                name="deptID"
                                select
                                label="Department ID"
                                value={this.state.deptID}
                                onChange={this.handleDeptIDSelectChange}
                                variant="filled"
                                margin="normal"
                                >
                                {deptList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.deptID}>
                                        {option.deptName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                required
                                id="studentType"
                                name="studentType"
                                select
                                label="Student Type"
                                value={this.state.studentType}
                                onChange={this.handleStudentTypeSelectChange}
                                variant="filled"
                                margin="normal"
                                >
                                        <MenuItem value={"Undergraduate"}>
                                        {"Undergraduate"}
                                        </MenuItem>
                                        <MenuItem value={"Graduate"}>
                                            {"Graduate"}
                                        </MenuItem>
                                    
                            </TextField>
                            <KeyboardDatePicker
                                fullWidth
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateOfAdmission"
                                label="Date of Admission"
                                value={this.state.dateOfAdmission}
                                onChange={this.handleDateOfAdmissionChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                select
                                id="major"
                                label="Major"
                                name="major"
                                autoFocus
                                value={this.state.major}
                                onChange={this.handleMajorSelectChange}
                            >
                                {degreeProgramList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.degreeTitle}>
                                        {option.degreeTitle}
                                    </MenuItem>
                                ))}
                            </ TextField>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Save
                            </Button>
                        </form>
                        <Typography>
                            { successMessage }
                        </Typography>
                    </div>
                </Container>
            </MuiPickersUtilsProvider>
        );
    }
}

export default AddStudentForm;