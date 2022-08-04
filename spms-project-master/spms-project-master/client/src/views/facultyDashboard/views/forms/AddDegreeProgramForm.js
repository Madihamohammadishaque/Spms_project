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
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
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

class AddDegreeProgramForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            degreeID: '',
            degreeTitle: '',
            deptID: [],
            deptList: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    async componentDidMount () {
        const { data } = await axios.get('/api/get/department');
        console.dir(data);
        this.setState ({ deptList: data.response });
        deptList = this.state.deptList;
        console.log(deptList);
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
        
        const degreeProgramData = this.state;
        // Use api to insert data into semester table
        this.submitFormData(degreeProgramData);
        this.setState({
            degreeID: '',
            degreeTitle: '',
            deptID: []
        });
    }  

    
    handleSelectChange (event) {
        this.setState({
            deptID: event.target.value
        });
    }

    submitFormData = async (degreeProgramData) => {
        const response = await axios.post(
            '/api/put/degreeprogramdata',
            degreeProgramData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(response);
        if (response.data.success === 'Department Data Entered.')  {
            console.log('Department Data entered')
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
                            Add a Degree Program
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="degreeID"
                                label="Degree ID"
                                name="degreeID"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="degreeTitle"
                                label="Degree Title"
                                name="degreeTitle"
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
                                onChange={this.handleSelectChange}
                                variant="filled"
                                margin="normal"
                                >
                                   {deptList.map((option) => (
                                    <MenuItem key={uuidv4()} value={option.deptID}>
                                        {option.deptName}
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

export default AddDegreeProgramForm;