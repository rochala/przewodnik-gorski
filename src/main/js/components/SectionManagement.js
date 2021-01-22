import React, {Fragment, useEffect, useState} from "react";
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
import Button from "@material-ui/core/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';


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


const SectionManagement = () => {
    const [data, setData] = useState([]);
    const [mountainRange, setMountainRange] = useState("TATRY");
    const [minPoints, setMinPoints] = useState([0, 50]);
    const [name, setName] = useState('');
    const [queryData, setQueryData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const url = 'http://127.0.0.1:8080/api/sections/?range=';
    const [selectedTrip, setSelectedTrip] = useState([]);
    const [locations, setLocations] = useState([]);
    const [startingLocation, setStartingLocation] = useState({})

    const columns = [
        {id: 'name', label: 'Nazwa odcinka', minWidth: "50%"},
        {id: 'range', label: 'Pasmo', minWidth: "25%"},
        {id: 'points', label: 'Punkty', minWidth: "15%"},
        {id: 'length', label: 'Długość', minWidth: "10%"},
    ]



    const classes = useStyles()

    useEffect(() => {
        loadData(url + mountainRange);
        fetch("http://127.0.0.1:8080/api/locations")
            .then((response) => response.json())
            .then(json => {
                setLocations(json);
            });
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
        setPage(0)
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
        updateQuerryData(event.target.value, minPoints)
    }

    const handleChangeMinPoints = (event, newValue) => {
        setMinPoints(newValue)
        updateQuerryData(name, newValue)
    }

    const handleNewSection = (event) => {
        setSelectedTrip([]);
    }

    const handleModifyTrip = (event, id) => {
        setSelectedTrip(queryData[id]);
    }

    return (
        <React.Fragment>
            <div className={classes.heroContent}>
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h1" align="center" color="textPrimary">
                        Zarządzanie trasami punktowanymi
                    </Typography>
                    <hr/>
                    <Grid paper container direction="row" justify="space-evenly">
                        <Container style={{width: '50%'}} fullWidth={true}>
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
                                <hr style={{width: '100%'}}/>
                                <Button fullWidth={true} variant="outlined" onClick={handleNewSection} >
                                    Dodaj nową trasę
                                </Button>
                            </Grid>
                            <hr style={{width: '100%'}}/>
                            <Table stickyHeader aria-label="sticky table" size="small">
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
                                    {queryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={data.description} style={{height: '61px'}} onClick={event => handleModifyTrip(event, index)}>
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
                                    rowsPerPageOptions={[6, 10, 25, 100]}
                                    count={queryData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Table>
                        </Container>
                    <Container style={{width: '50%'}} fullWidth={true}>
                            <Typography variant="h3" align="center" className={classes.spacedText}>
                                    {Array.isArray(selectedTrip) ? "Dodawanie nowej trasy punktowanej" : "Modyfikacja trasy punktowanej"}
                            </Typography>
                        <hr/>
                            <Autocomplete
                                id="combo-box-demo"
                                options={locations}
                                getOptionLabel={(option) => option.locationName + " - " + option.mountainRange}
                                style={{ width: '100%', scrollbarColor: 'rgb(107, 107, 107) rgb(43, 43, 43)' }}
                                renderInput={(params) => <TextField {...params} label="Punkt początkowy" variant="outlined" />}
                            />
                            <hr/>
                        <Autocomplete
                            id="combo-box-demo"
                            options={locations}
                            getOptionLabel={(option) => option.locationName + " - " + option.mountainRange}
                            style={{ width: '100%', scrollbarColor: 'rgb(107, 107, 107) rgb(43, 43, 43)' }}
                            renderInput={(params) => <TextField {...params} label="Punkt końcowy" variant="outlined" />}
                        />
                    <hr/>
                        <Grid container direction="row" justify="space-evenly" alignItems="center">
                            <TextField
                                error={false}
                                id="standard-error-helper-text"
                                label="Punkty A-B"
                                defaultValue={0}
                                type="number"
                                helperText="Incorrect entry."
                                style={{width: '45%'}}
                            />
                            <TextField
                                error={false}
                                id="standard-error-helper-text"
                                label="Punkty B-A"
                                defaultValue={0}
                                type="number"
                                helperText="Incorrect entry."
                                style={{width: '45%'}}
                            />
                        </Grid>
                        <hr/>
                        <Button fullWidth={true} variant="outlined">
                            Zatwierdź nową trasę
                        </Button>
                    </Container>
                    </Grid>
                </Container>
            </div>
        </React.Fragment>
    );
}


export default SectionManagement;