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
        const { data } = await axios.get('');
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
                        <TableCell align="right">Course Title</TableCell>
                        <TableCell align="right">Course Description</TableCell>
                        <TableCell align="right">Credit Hour</TableCell>
                        <TableCell align="right">Department</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*rows.map(row => (
                    <TableRow key={uuidv4()}>
                        <TableCell component="th" scope="row">
                        {}
                        </TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                    </TableRow>
                    ))*/}
                </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
 }

 export default CourseTable;