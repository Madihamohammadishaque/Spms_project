import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';

const accountTypes = [
    {
        value: 'Admin',
        label: 'Admin',
        key: 1
    },
    {
        value: 'Accreditor',
        label: 'Accreditor',
        key: 2
    },
    {
        value: 'Student',
        label: 'Student',
        key: 3
    },
    {
        value: 'Faculty',
        label: 'Faculty',
        key: 4
    },
    {
        value: 'Management Account',
        label: 'Management Account',
        key: 5
    },
];

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class SignInForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            accountType: '',
            accountID: '',
            password: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleChange (event) {
        this.props.onHandleChange(event);
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.onHandleSubmit(event);
    }  

    handleSelectChange (event) {
        this.setState({
            accountType: event.target.value
        });
        this.props.onHandleChange(event);
    }
 
    render () {
        const classes = useStyles;
        let successMessage = this.props.successMessage;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in to your SPMS App account to view the Dashboard.
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            fullWidth
                            required
                            id="accountType"
                            name="accountType"
                            select
                            label="Account Type"
                            value={this.state.accountType}
                            onChange={this.handleSelectChange}
                            variant="outlined"
                            margin="normal"
                            >
                                {accountTypes.map((option) => (
                                    <MenuItem key={option.key} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="accountID"
                            label="Account ID"
                            name="accountID"
                            autoComplete="accountID"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                        />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                            Sign In
                            </Button>
                    </form>
                    <Typography>
                        { successMessage }
                    </Typography>
                </div>
            </Container>
        );
    }
}

export default SignInForm;