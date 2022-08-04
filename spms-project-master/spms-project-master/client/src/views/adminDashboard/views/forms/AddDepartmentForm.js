import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
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

let schoolsList = [];
let facultiesList = [];

class AddDepartmentForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            deptID: '',
            schoolName: '',
            deptName: '',
            location: '',
            deptHeadID: 0,
            schoolsList: [],
            facultiesList: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSchoolSelectChange = this.handleSchoolSelectChange.bind(this);
        this.handleDeptHeadSelectChange = this.handleDeptHeadSelectChange.bind(this);
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
        const departmentData = this.state;
        // Use api to insert data into department table
        this.submitFormData(departmentData);
        this.setState({
            deptID: '',
            schoolName: '',
            deptName: '',
            location: '',
            deptHeadID: 0,
        });
    }  

    handleSchoolSelectChange (event) {
        this.setState({
            schoolName: event.target.value
        });
    }

    handleDeptHeadSelectChange (event) {
        this.setState({
            deptHeadID: event.target.value
        });
    }

    submitFormData = async (departmentData) => {
        const response = await axios.post(
            '/api/put/departmentdata',
            departmentData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Department Data Entered.')  {
            console.log('Department Data entered')
        }
        
    }

    async loadSchools () {
        let { data }= await axios.get('/api/get/schools');
        console.dir(data);
        this.setState ({ schoolsList: data.response });
        schoolsList = this.state.schoolsList;
        console.log(schoolsList);   
    }

    async loadFaculties () {
        let { data }= await axios.get('/api/get/facultyaccounts');
        console.dir(data);
        this.setState ({ facultiesList: data.response });
        facultiesList = this.state.facultiesList;
        console.log(facultiesList);   
    }
    
    async componentDidMount () {
        this.loadSchools();
        this.loadFaculties();
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
                            Add a Department
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="deptID"
                                label="Department ID"
                                name="deptID"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                select
                                required
                                fullWidth
                                value={this.state.schoolName}
                                id="schoolName"
                                label="Under School of"
                                name="schoolName"
                                onChange={this.handleSchoolSelectChange}
                            >
                                {schoolsList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.schoolName}>
                                        {option.schoolName}
                                    </MenuItem>
                                ))}
                            </ TextField>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="deptName"
                                label="Department Name"
                                name="deptName"
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                select
                                required
                                fullWidth
                                value={this.state.deptHeadID}
                                id="deptHeadID"
                                label="Department Head"
                                name="deptHeadID"
                                onChange={this.handleDeptHeadSelectChange}
                            >
                                {facultiesList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.accountID}>
                                        {option.firstName + ' ' + option.lastName}
                                    </MenuItem>
                                ))}
                            </ TextField>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="location"
                                label="Department Location"
                                name="location"
                                onChange={this.handleChange}
                            />
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

export default AddDepartmentForm;