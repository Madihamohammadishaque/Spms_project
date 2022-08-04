import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { v4 as uuidv4 } from 'uuid';

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

class AddCourseForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            courseID: 0,
            courseTitle: '',
            courseDescription: '',
            creditHour: 0.0,
            deptID: '',
            degreeID: '',
            deptList: [],
            degreeProgramList: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeptIDSelectChange = this.handleDeptIDSelectChange.bind(this);
        this.handleDegreeIDSelectChange = this.handleDegreeIDSelectChange.bind(this);
    }

    async loadDepartment () {
        let { data } = await axios.get('/api/get/department');
        console.dir(data);
        this.setState ({ deptList: data.response });
        deptList = this.state.deptList;
        console.log(deptList);
    }

    async loadDegreeProgram () {
        let { data }= await axios.get('/api/get/degreeprogram');
        console.dir(data);
        this.setState ({ degreeProgramList: data.response });
        degreeProgramList = this.state.degreeProgramList;
        console.log(degreeProgramList);   
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
        
        console.dir(this.state);
        const degreeID = this.state.degreeID;
        const courseID = this.state.courseID;
        const courseData = this.state;
        const degreeCourseData = {
            degreeID,
            courseID
        }
        // use api to insert data into course table
        this.submitFormData(courseData, degreeCourseData);
        this.setState({
            courseID: 0,
            courseTitle: '',
            courseDescription: '',
            creditHour: 0.0,
            deptID: '',
            degreeID: '',
        });
    } 
    
    async submitDegreeProgramCourse(degreeCourseData) {
        const response = await axios.post(
            '/api/put/degreeprogramcourse',
            degreeCourseData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Course Data Entered.')  {
            console.log('Course Data entered')
        }
    }

    submitFormData = async (courseData, degreeCourseData) => {
        let response = await axios.post(
            '/api/put/course',
            courseData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Course Data Entered.')  {
            console.log('Course Data entered')
        }
        
        response = await axios.post(
            '/api/put/degreeprogramcourse',
            degreeCourseData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Degree Program Course Data Entered.')  {
            console.log('Degree Program Course Data entered')
        }
    }
    
    handleDeptIDSelectChange (event) {
        this.setState({
            deptID: event.target.value
        });
    }

    handleDegreeIDSelectChange (event) {
        this.setState({
            degreeID: event.target.value
        });
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
                            Add a Course
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="courseID"
                                label="Course ID"
                                name="courseID"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="courseTitle"
                                label="Course Title"
                                name="courseTitle"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="courseDescription"
                                label="Course Description"
                                name="courseDescription"
                                onChange={this.handleChange}
                                multiline
                                required
                                fullWidth
                                defaultValue=""
                                variant="filled"
                            />
                            <TextField
                                type="number"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="creditHour"
                                label="Credit Hour"
                                name="creditHour"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                fullWidth
                                required
                                id="deptID"
                                name="deptID"
                                select
                                label="Department Name"
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
                                id="degreeID"
                                name="degreeID"
                                select
                                label="Degree ID"
                                value={this.state.degreeID}
                                onChange={this.handleDegreeIDSelectChange}
                                variant="filled"
                                margin="normal"
                                >
                                {degreeProgramList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.degreeID}>
                                        {option.degreeTitle}
                                    </MenuItem>
                                ))} 
                            </TextField>
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

export default AddCourseForm;