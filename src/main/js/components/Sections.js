import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, MenuItem, TextField, Button } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";




const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));


const Sections = () => {
    const [data, setData] = useState([]);
    const [mountainRange, setMountainRange] = useState("TATRY");
    const [minPoints, setMinPoints] = useState(0);
    const [name, setName] = useState('');
    const [querryData, setQuerryData] = useState([])


    const columns = [
        { id: 'name', label: 'Nazwa odcinka'},
        { id: 'range', label: 'Pasmo'},
        { id: 'points', label: 'Punkty'},
        { id: 'length', label: 'Długość'},
    ]


    const url = 'http://127.0.0.1:8080/api/sections/?range=';

    useEffect(() => {
        loadData(url + mountainRange);
    }, []);

    const loadData = async (url) => {
        const response = await fetch(url , {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
        });
        const data = await response.json()
        setData(data);
        setQuerryData(data);
    }

    const classes = useStyles()

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeMountainRange = (event) => {
        setMountainRange(event.target.value);
        loadData(url + event.target.value);
        setName('');
        setPage(0);
    };

    function updateQuerryData() {
        if(name.length >= 3) {
            setQuerryData(data.filter(element =>
                element.start.locationName.toLowerCase().startsWith(name.toLowerCase())
                || element.end.locationName.toLowerCase().startsWith(name.toLowerCase())));
        } else {
            setQuerryData(data);
        }
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
        updateQuerryData()
    }

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <form noValidate>
                        <Container maxWidth="lg">
                            <Typography variant="h2" component="h1" align="center" color="textPrimary">
                                Przeglądanie tras punktowanych
                            </Typography>
                            <hr />
                            <Grid container direction="row" justify="space-evenly" alignItems="center">
                                <TextField
                                    fullWidth={true}
                                    label="Pasmo górskie"
                                    id="symbolSelect"
                                    value={mountainRange}
                                    onChange={handleChangeMountainRange}
                                    select>
                                    <MenuItem value="TATRY">Tatry</MenuItem>
                                    <MenuItem value="BESKIDY_ZACHODNIE">Beskidy Zachodnie</MenuItem>
                                    <MenuItem value="BESKIDY_WSCHODNIE">Beskidy Wschodnie</MenuItem>
                                    <MenuItem value="SUDETY">Sudety</MenuItem>
                                </TextField>
                                <TextField
                                    fullWidth={true}
                                    label="Nazwa punktu"
                                    id="pointName"
                                    value={name}
                                    onChange={handleChangeName}
                                    />
                            </Grid>
                            <hr />
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.name} align="left">
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {querryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={data.description}>
                                                <TableCell key="name" align="left">
                                                    {row.start.locationName} - {row.end.locationName}
                                                </TableCell>
                                                <TableCell key="range" align="left">
                                                    {`${(row.start.mountainRange !== row.end.mountainRange) ? row.start.mountainRange + " - " + row.end.mountainRange : row.start.mountainRange}`}
                                                </TableCell>
                                                <TableCell key="points" align="left">
                                                    {row.startToEndPoints} / {row.endToStartPoints}
                                                </TableCell>
                                                <TableCell key="length" align="left">
                                                    {row.length}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={querryData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />

                            </Table>

                        </Container>
                    </form>
                </div>
            </main>


        </React.Fragment>

    );

}


export default Sections;