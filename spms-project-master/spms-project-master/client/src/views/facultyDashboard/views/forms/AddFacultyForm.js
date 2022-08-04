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
  KeyboardDatePicker
} from '@material-ui/pickers';

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

class AddFacultyForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            accountID: 0,
            specialization: '',
            deptID: '',
            dateHired: new Date('2014-08-18T21:11:54')
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeptIDSelectChange = this.handleDeptIDSelectChange.bind(this);
    }

    handleChange (name, event) {
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit (name, event) {
        this.setState({
            [name]: event.target.value
        });
    }  

    
    handleDeptIDSelectChange (event) {
        this.setState({
            accountType: event.target.value
        });
        this.props.onHandleChange(event);
    }

    handleEndDateChange (event) {
        console.dir(event);
        this.setState({
            dateHired: event
        });
        //this.props.onHandleChange(event);
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
                                id="specialization"
                                label="Faculty Specialization"
                                name="specialization"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                type="number"
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
                                    { /* load departments from database tab */ }
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