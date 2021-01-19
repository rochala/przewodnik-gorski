import React, {useEffect, useState} from "react";
import {Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel'


const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    filterInputs: {
        width: "30%"
    },
    sliderFix: {
        padding: "15px 0px 0px"
    }
}));


const Sections = () => {
    const [data, setData] = useState([]);
    const [mountainRange, setMountainRange] = useState("TATRY");
    const [minPoints, setMinPoints] = useState([0, 50]);
    const [name, setName] = useState('');
    const [queryData, setQueryData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const url = 'http://127.0.0.1:8080/api/sections/?range=';

    const columns = [
        {id: 'name', label: 'Nazwa odcinka', minWidth: "50%"},
        {id: 'range', label: 'Pasmo', minWidth: "25%"},
        {id: 'points', label: 'Punkty', minWidth: "12.5%"},
        {id: 'length', label: 'Długość', minWidth: "12.5%"},
    ]

    const classes = useStyles()

    useEffect(() => {
        loadData(url + mountainRange);
    }, []);

    const loadData = async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        });
        const data = await response.json()
        setData(data);
        setQueryData(data);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleChangeMountainRange = (event) => {
        setMountainRange(event.target.value);
        loadData(url + event.target.value);
        setName('');
        setMinPoints([0, 50])
        setPage(0);
    };

    const updateQuerryData = (name, minPoints) => {
        if (name.length >= 3) {
            setQueryData(data.filter(element =>
                (element.start.locationName.toLowerCase().startsWith(name.toLowerCase())
                    || element.end.locationName.toLowerCase().startsWith(name.toLowerCase()))
                && (parseInt(element.endToStartPoints, 10) + parseInt(element.startToEndPoints, 10) >= parseInt(minPoints[0], 10))
                && (parseInt(element.endToStartPoints, 10) + parseInt(element.startToEndPoints, 10) <= parseInt(minPoints[1], 10))
            ));
        } else {
            setQueryData(data.filter(element =>
                (parseInt(element.endToStartPoints, 10) + parseInt(element.startToEndPoints, 10) >= parseInt(minPoints[0], 10))
                && (parseInt(element.endToStartPoints, 10) + parseInt(element.startToEndPoints, 10) <= parseInt(minPoints[1], 10))
            ));
        }
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
        updateQuerryData(event.target.value, minPoints)
    }

    const handleChangeMinPoints = (event, newValue) => {
        setMinPoints(newValue)
        updateQuerryData(name, newValue)
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
                            <hr/>
                            <Grid container direction="row" justify="space-evenly" alignItems="center">
                                <TextField
                                    className={classes.filterInputs}
                                    fullWidth={true}
                                    label="Pasmo górskie"
                                    value={mountainRange}
                                    onChange={handleChangeMountainRange}
                                    select>
                                    <MenuItem value="TATRY">Tatry</MenuItem>
                                    <MenuItem value="BESKIDY_ZACHODNIE">Beskidy Zachodnie</MenuItem>
                                    <MenuItem value="BESKIDY_WSCHODNIE">Beskidy Wschodnie</MenuItem>
                                    <MenuItem value="SUDETY">Sudety</MenuItem>
                                </TextField>
                                <TextField
                                    className={classes.filterInputs}
                                    fullWidth={true}
                                    label="Nazwa punktu"
                                    value={name}
                                    onChange={handleChangeName}
                                />
                                <div className={classes.filterInputs}>
                                    <InputLabel id="slider">
                                        Zakres sumy punktów
                                    </InputLabel>
                                    <Slider
                                        style={{padding: "15px 0 0"}}
                                        value={minPoints}
                                        onChange={handleChangeMinPoints}
                                        valueLabelDisplay="auto"
                                        label="Zakres sumy punktów"
                                        aria-labelledby="slider"
                                        max={50}
                                        fullWidth={true}
                                    />
                                </div>
                            </Grid>
                            <hr/>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.name}
                                                align="left"
                                                style={{width: column.minWidth}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {queryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    count={queryData.length}
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