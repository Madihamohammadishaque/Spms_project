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

class DepartmentTable extends React.Component {
    signal = axios.CancelToken.source();

    constructor (props) {
        super (props);
        this.state = {
            departmentList: []
        };
    }

    async componentDidMount () {
        const { data } = await axios.get('/api/get/department');
        console.dir(data);
        this.setState ({ departmentList: data.response });
        rows = this.state.departmentList;
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
                        <TableCell>Department Name</TableCell>
                        <TableCell align="right">Dept ID</TableCell>
                        <TableCell align="right">Dept Location</TableCell>
                        <TableCell align="right">Under the School of</TableCell>
                        <TableCell align="right">Dept Head ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <TableRow key={uuidv4()}>
                        <TableCell component="th" scope="row">
                        {row.deptName}
                        </TableCell>
                        <TableCell align="right">{row.deptID}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right">{row.schoolName}</TableCell>
                        <TableCell align="right">{row.deptHeadID}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
 }

 export default DepartmentTable;