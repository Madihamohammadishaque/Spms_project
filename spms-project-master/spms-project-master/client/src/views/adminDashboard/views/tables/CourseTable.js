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

class CourseTable extends React.Component {
    signal = axios.CancelToken.source();

    constructor (props) {
        super (props);
        this.state = {
            coursesList: []
        };
    }

    async componentDidMount () {
        const { data } = await axios.get('/api/get/course');
        console.dir(data);
        this.setState ({ coursesList: data.response });
        rows = this.state.coursesList;
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
                        <TableCell>Course ID</TableCell>
                        <TableCell align="left">Course Title</TableCell>
                        <TableCell align="left">Course Description</TableCell>
                        <TableCell align="left">Credit Hour</TableCell>
                        <TableCell align="left">Department</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <TableRow key={uuidv4()}>
                        <TableCell component="th" scope="row">
                        {row.courseID}
                        </TableCell>
                        <TableCell align="left">{row.courseTitle}</TableCell>
                        <TableCell align="left">{row.courseDescription}</TableCell>
                        <TableCell align="left">{row.creditHour}</TableCell>
                        <TableCell align="left">{row.deptID}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
 }

 export default CourseTable;