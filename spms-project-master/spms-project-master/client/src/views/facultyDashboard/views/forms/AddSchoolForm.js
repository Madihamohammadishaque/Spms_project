import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

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

class AddSchoolForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            schoolName: '',
            location: '',
            deanInChargeName: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const schoolData = this.state;
        // Use api to insert data into school table
        this.submitFormData(schoolData);
        this.setState({
            schoolName: '',
            location: '',
            deanInChargeName: ''
        });
    }

    submitFormData = async (schoolData) => {
        const response = await axios.post(
            '/api/put/schooldata',
            schoolData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'School Data Entered.')  {
            console.log('School Data entered')
        }
        
    }
    render () {
        const classes = useStyles;
        let successMessage = this.props.successMessage;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Add a School to the University
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="schoolName"
                            label="School Name"
                            name="schoolName"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            label="School Location"
                            name="location"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="deanInChargeName"
                            label="Dean In Charge's Full Name"
                            name="deanInChargeName"
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
        );
    }
}

export default AddSchoolForm;