import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const useStyles = makeStyles({
root: {
    width: '100%',
},
paper: {
    width: '100%',
    overflowX: 'auto',
},
table: {
    minWidth: 650,
},
});

let rows = [];

class StudentTable extends React.Component {
    signal = axios.CancelToken.source();

    constructor (props) {
        super (props);
        this.state = {
            studentsList: []
        };
    }

    async componentDidMount () {
        const { data } = await axios.get('/api/get/studentaccount');
        console.dir(data);
        this.setState ({ studentsList: data.response });
        rows = this.state.studentsList;
        console.log(rows);
        
        this.forceUpdate();
    }
    render () {
        const classes = useStyles;

        return (
            <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Student ID</TableCell>
                        <TableCell align="left">Student Name</TableCell>
                        <TableCell align="left">Student Email</TableCell>
                        <TableCell align="left">Dept ID</TableCell>
                        <TableCell align="left">Student Major</TableCell>
                        <TableCell align="left">Student Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <TableRow key={uuidv4()}>
                        <TableCell component="th" scope="row">
                        {row.accountID}
                        </TableCell>
                        <TableCell align="left">{row.firstName + ' ' + row.lastName}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.deptID}</TableCell>
                        <TableCell align="left">{row.major}</TableCell>
                        <TableCell align="left">{row.studentType}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
 }

 export default StudentTable;