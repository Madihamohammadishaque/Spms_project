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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
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

class AddSemesterForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            season: '',
            year: '',
            startDate: dateFormat(new Date('2014-08-18'), "isoDate"),
            endDate: dateFormat(new Date('2014-08-18'), "isoDate")
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
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
        const semesterData = this.state;
        // Use api to insert data into semester table
        this.submitFormData(semesterData);
        this.setState({
            season: '',
            year: '',
            startDate: dateFormat(new Date('2014-08-18'), "isoDate"),
            endDate: dateFormat(new Date('2014-08-18'), "isoDate")
        });
    }  

    handleStartDateChange (event) {
        console.dir(event);
        this.setState({
            startDate: dateFormat(event, "isoDate")
        });
        //this.props.onHandleChange(event);
    }

    handleEndDateChange (event) {
        console.dir(event);
        this.setState({
            endDate: dateFormat(event, "isoDate")
        });
        //this.props.onHandleChange(event);
    }

    submitFormData = async (semesterData) => {
        const response = await axios.post(
            '/api/put/semesterdata',
            semesterData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Semester Data Entered.')  {
            console.log('Semester Data entered')
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
                            Add a Semester
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="season"
                                label="Semester Season"
                                name="season"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="year"
                                label="Semester Year"
                                name="year"
                                onChange={this.handleChange}
                            />
                            <KeyboardDatePicker
                                fullWidth
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="startDate"
                                label="Semester Start Date"
                                value={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                fullWidth
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="endDate"
                                label="Semester End Date"
                                value={this.state.endDate}
                                onChange={this.handleEndDateChange}
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

export default AddSemesterForm;