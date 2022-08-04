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
import dateFormat from  'dateformat';
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

class AddFacultyForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            fAccountID: 0,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            accountType: 'Faculty',
            specialization: '',
            deptID: '',
            dateHired: new Date('2014-08-18T21:11:54')
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateHireChange = this.handleDateHireChange.bind(this);
        this.handleDeptIDSelectChange = this.handleDeptIDSelectChange.bind(this);
    }

    handleChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    handleDeptIDSelectChange (event) {
        this.setState({
            deptID: event.target.value
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        const facultyData = this.state;

        const fAccountID = this.state.fAccountID;
        const fDeptID = this.state.deptID;
        const fDateHired = this.state.dateHired;
        const fSpecialization = this.state.specialization;

        const facultyTableData = {
            fAccountID,
            fDeptID,
            fDateHired,
            fSpecialization
        };

        // Use api to insert data into semester table
        this.submitFormData(facultyData, facultyTableData);
        this.setState({
            fAccountID: 0,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            accountType: 'Faculty',
            specialization: '',
            deptID: '',
            dateHired: new Date('2014-08-18T21:11:54')
        });
    }  
    
    handleDateHireChange (event) {
        console.dir(event);
        this.setState({
            dateHired: dateFormat(event, "isoDate")
        });
    }

    async componentDidMount () {
        let { data } = await axios.get('/api/get/department');
        console.dir(data);
        this.setState ({ deptList: data.response });
        deptList = this.state.deptList;
        console.log(deptList);
    }

    submitFormData = async (facultyData, facultyTableData) => {
        let response = await axios.post(
            '/api/put/facultyaccount',
            facultyData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Account Data Entered.')  {
            console.log('Account Data entered')
        }
        
        response = await axios.post(
            '/api/put/faculty',
            facultyTableData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Faculty Data Entered.')  {
            console.log('Faculty Data entered')
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
                            Add a Faculty
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="fAccountID"
                                label="Faculty Account ID"
                                name="fAccountID"
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
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="specialization"
                                label="Faculty Specialization"
                                name="specialization"
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
                            <KeyboardDatePicker
                                fullWidth
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateHired"
                                label="Date Hired"
                                value={this.state.dateHired}
                                onChange={this.handleDateHireChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
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

export default AddFacultyForm;