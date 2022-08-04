import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import axios from 'axios';
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

let coursesList = [];
let facultiesList = [];
let semesterList = [];

class AddOfferedCourseForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            offeredCourseID: '',
            semesterSeason: '',
            semesterYear: '',
            courseCoordinatorID: 0,
            coursesList: [],
            facultiesList: [],
            semesterList: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCourseSelectChange = this.handleCourseSelectChange.bind(this);
        this.handleCourseCoordinatorSelectChange = this.handleCourseCoordinatorSelectChange.bind(this);
        this.handleSemesterSeasonSelectChange = this.handleSemesterSeasonSelectChange.bind(this);
        this.handleSemesterYearSelectChange = this.handleSemesterYearSelectChange.bind(this);
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
        const offeredCourseData = this.state;
        // Use api to insert data into semester table
        this.submitFormData(offeredCourseData);
        this.setState({
            offeredCourseID: '',
            semesterSeason: '',
            semesterYear: '',
            courseCoordinatorID: 0,
        });
    } 

    handleCourseSelectChange (event) {
        this.setState({
            offeredCourseID: event.target.value
        });
    } 

    handleCourseCoordinatorSelectChange (event) {
        this.setState({
            courseCoordinatorID: event.target.value
        });
    } 

    handleSemesterSeasonSelectChange (event) {
        this.setState({
            semesterSeason: event.target.value
        });
    } 

    handleSemesterYearSelectChange (event) {
        this.setState({
            semesterYear: event.target.value
        });
    }
    
    submitFormData = async (offeredCourseData) => {
        const response = await axios.post(
            '/api/put/offeredcoursedata',
            offeredCourseData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Offered Course Data Entered.')  {
            console.log('Offered Course Data entered')
        }
        
    }

    async loadCourses () {
        let { data }= await axios.get('/api/get/course');
        console.dir(data);
        this.setState ({ coursesList: data.response });
        coursesList = this.state.coursesList;
        console.log(coursesList);   
    }

    async loadFaculties () {
        let { data }= await axios.get('/api/get/facultyaccounts');
        console.dir(data);
        this.setState ({ facultiesList: data.response });
        facultiesList = this.state.facultiesList;
        console.log(facultiesList);   
    }

    async loadSemester () {
        let { data }= await axios.get('/api/get/semester-details');
        console.dir(data);
        this.setState ({ semesterList: data.response });
        semesterList = this.state.semesterList;
        console.log(semesterList);   
    }
    
    async componentDidMount () {
        this.loadCourses();
        this.loadFaculties();
        this.loadSemester();
        this.forceUpdate();
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
                            Add an Offered Course
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                select
                                required
                                fullWidth
                                id="offeredCourseID"
                                label="Offered Course ID"
                                name="offeredCourseID"
                                autoFocus
                                value={this.state.offeredCourseID}
                                onChange={this.handleCourseSelectChange}
                            >
                                {coursesList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.courseID}>
                                        {option.courseTitle}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                required
                                select
                                id="courseCoordinatorID"
                                name="courseCoordinatorID"
                                label="Course Coordinator ID"
                                value={this.state.courseCoordinatorID}
                                onChange={this.handleCourseCoordinatorSelectChange}
                                variant="filled"
                                margin="normal"
                                >
                                {facultiesList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.fAccountID}>
                                        {option.firstName + ' ' + option.lastName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                variant="filled"
                                margin="normal"
                                select
                                required
                                fullWidth
                                id="semesterSeason"
                                label="semesterSeason"
                                name="semesterSeason"
                                autoFocus
                                value={this.state.semesterSeason}
                                onChange={this.handleSemesterSeasonSelectChange}
                            >
                                {semesterList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.season}>
                                        {option.season}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                variant="filled"
                                margin="normal"
                                select
                                required
                                fullWidth
                                id="semesterYear"
                                label="semesterYear"
                                name="semesterYear"
                                autoFocus
                                value={this.state.semesterYear}
                                onChange={this.handleSemesterYearSelectChange}
                            >
                                {semesterList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.year}>
                                        {option.year}
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

export default AddOfferedCourseForm;