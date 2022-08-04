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

class SemesterTable extends React.Component {
    signal = axios.CancelToken.source();

    constructor (props) {
        super (props);
        this.state = {
            semesterList: []
        };
    }

    async componentDidMount () {
        const { data } = await axios.get('/api/get/semester-details');
        console.dir(data);
        this.setState ({ semesterList: data.response });
        rows = this.state.semesterList;
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
                        <TableCell>Season</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right">Start Date (yyyy/mm/dd)</TableCell>
                        <TableCell align="right">End Date (yyyy/mm/dd)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <TableRow key={uuidv4()}>
                        <TableCell component="th" scope="row">
                        {row.season}
                        </TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                        <TableCell align="right">{row.startDate}</TableCell>
                        <TableCell align="right">{row.endDate}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
 }

 export default SemesterTable;