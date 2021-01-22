import React, {Fragment, useEffect, useState} from "react";
import {Container, Grid, GridList, Box, Typography, MenuItem} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import TableCell from "@material-ui/core/TableCell";
import {Backspace} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from "@material-ui/core/Slider";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    list: {
        width: '100% !important',
        overflow: 'auto',
        scrollbarColor: 'rgb(107, 107, 107) rgb(43, 43, 43)',
    },
    element: {
        height: '63vh',
        minHeight: '400px',
    },
    spacedText: {
        padding: '5px'
    },
    filterInputs: {
        width: "45%"
    },
    sliderFix: {
        padding: "15px 0px 0px"
    },
}));


const TripCreator = (props) => {
    const [data, setData] = useState([]);
    const [mountainRange, setMountainRange] = useState("TATRY");
    const [minPoints, setMinPoints] = useState([0, 50]);
    const [name, setName] = useState('');
    const [queryData, setQueryData] = useState([])
    const [page, setPage] = useState(0);
    const [tripPage, setTripPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [autosuggestions, setAutosuggestions] = useState(false);
    const url = 'http://127.0.0.1:8080/api/sections/?range=';

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState( "");
    const [leaderAttendance, setLeaderAttendance] = useState(false)
    const [tripSections, setTripSections] = useState( []);
    const [previousValue, setPreviousValue] = useState([]);
    const [modifyingState, setModifyingState] = useState(false);

    if (props.modifying !== previousValue) {
        setPreviousValue(props.modifying)
        if (!Array.isArray(props.modifying)) {
            setStartDate(props.modifying.startDate);
            setEndDate(props.modifying.endDate);
            setLeaderAttendance(props.modifying.leaderAttendance);
            setTripSections(props.modifying.tripSection)
            setModifyingState(true)
        }
    }

    const columns = [
        {id: 'name', label: 'Nazwa odcinka', minWidth: "50%"},
        {id: 'points', label: 'Punkty', minWidth: "25%"},
        {id: 'length', label: 'Długość', minWidth: "25%"},
    ]

    const tripSectionsColumns = [
        {id: 'name', label: 'Nazwa odcinka', minWidth: '50%', align: 'left'},
        {id: 'points', label: 'Punkty', minWidth: "20%", align: 'right'},
        {id: 'length', label: 'Długość', minWidth: "20%", align: 'right'},
        {id: 'delete', label: 'Usuń', minWidth: "10%", align: 'center'},
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

    const handleChangePage = (event, newValue) => {
        setPage(newValue);
    };

    const handleChangeTripPage = (event, newValue) => {
        setTripPage(newValue);
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

    const handleChangeAutosuggestions = (event) => {
        setAutosuggestions((!autosuggestions))
        if (!autosuggestions && tripSections.length > 0) {
            setRowsPerPage(8)
            setName('');
            setMinPoints([0, 50])
            setPage(0);
            let endPoint = tripSections[tripSections.length - 1].direction ? tripSections[tripSections.length - 1].section.end.locationName : tripSections[tripSections.length - 1].section.start.locationName
            setQueryData(data.filter(e => (e.start.locationName === endPoint) ||
                (e.end.locationName === endPoint)))
        } else {
            setRowsPerPage(4)
            setQueryData(data)
            setName('');
            setMinPoints([0, 50])
            setPage(0);
        }
    }

    const handleAddNewTripSection = (event, row) => {
        setTripSections(oldArray => [...oldArray, row]);
        if (autosuggestions) {
            setName('');
            setMinPoints([0, 50])
            setPage(0);
            let endPoint = row.direction ? row.section.end.locationName : row.section.start.locationName
            setQueryData(data.filter(e => (e.start.locationName === endPoint) ||
                (e.end.locationName === endPoint)))
        }
    }

    const handleRemoveTripSection = (event, rowId) => {
        setTripSections(tripSections.filter((e, i) => i !== rowId))
    }

    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value)
    }

    const handleChangeEndDate = (event) => {
        setEndDate(event.target.value)
    }

    const handleCloseEvent = (event, fnc) => {
        setTripSections([])
        setName('');
        setMinPoints([0, 50])
        setPage(0);
        setTripPage(0);
        setStartDate("");
        setEndDate("");
        setQueryData(data);
        setModifyingState(false);
        fnc()
    }

    const handleChangeLeaderAttendance = (event) => {
        setLeaderAttendance(!leaderAttendance)
    }


    return (
        <Dialog style={{scrollbarColor: 'rgb(107, 107, 107) rgb(43, 43, 43)' ,height: '100vh',maxHeight: '100vh'}}
                open={props.open}
                onClose={event => handleCloseEvent(event,props.onClose)} aria-labelledby="form-dialog-title" maxWidth={"lg"} fullWidth={true}>

            <DialogTitle id="form-dialog-title">{modifyingState ? "Modyfikacja wycieczki" : "Dodaj nową wycieczkę"}</DialogTitle>
            <DialogContent>
                <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                    <Grid container direction="row" justify="space-evenly" alignItems="center" style={{width: '50%'}} fullWidth={true}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="startDate"
                            label="Data rozpoczęcia"
                            type="date"
                            style={{width: '30%'}}
                            value={startDate}
                            onChange={handleChangeStartDate}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />
                        <TextField
                            margin="dense"
                            id="endDate"
                            label="Data zakończenia"
                            type="date"
                            style={{width: '30%'}}
                            value={endDate}
                            onChange={handleChangeEndDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControlLabel style={{width: '30%'}}
                            control={<Switch
                                checked={leaderAttendance}
                                onChange={handleChangeLeaderAttendance} name="checkedA" />}
                            label="o. Przodownika"
                        />
                        <Table size="small" stickyHeader aria-label="sticky table" style={{maxHeight: '440px'}}>
                            <TableHead>
                                <TableRow>
                                    {tripSectionsColumns.map((column) => (
                                        <TableCell
                                            key={column.name}
                                            align={column.align}
                                            style={{width: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tripSections.slice(tripPage * rowsPerPage * 2, tripPage * rowsPerPage * 2 + rowsPerPage * 2).map((row, id) => {
                                    if (row.direction) {
                                    return(
                                        <TableRow hover role="checkbox"
                                                  tabIndex={-1} key={data.description}
                                                  style={{height: '61px'}}>
                                            <TableCell key="name" align="left">
                                                {row.section.start.locationName} - {row.section.end.locationName}
                                            </TableCell>
                                            <TableCell key="points" align="right">
                                                {row.section.startToEndPoints}
                                            </TableCell>
                                            <TableCell key="length" align="right">
                                                {row.section.length}
                                            </TableCell>
                                            <TableCell key="delete" align="center">
                                                <IconButton aria-label="delete" onClick={event => handleRemoveTripSection(event, id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return(
                                        <TableRow hover role="checkbox"
                                                  tabIndex={-1} key={data.description}
                                                  style={{height: '61px'}}>
                                            <TableCell key="name" align="left">
                                                {row.section.end.locationName} - {row.section.start.locationName}
                                            </TableCell>
                                            <TableCell key="points" align="right">
                                                {row.section.endToStartPoints}
                                            </TableCell>
                                            <TableCell key="length" align="right">
                                                {row.section.length}
                                            </TableCell>
                                            <TableCell>
                                            <IconButton aria-label="delete" onClick={event => handleRemoveTripSection(event, id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>)
                                    }
                                }
                            )}
                            <TableRow>
                                <TableCell colSpan={1} align="right">Suma</TableCell>
                                <TableCell align="right">{(tripSections.length > 0) ?
                                        tripSections.reduce((sum, trip) => {
                                           return sum + ((trip.direction) ? trip.section.startToEndPoints : trip.section.endToStartPoints);
                                        }, 0) : 0 }
                                </TableCell>
                                <TableCell align="right">{(tripSections.length > 0) ?
                                    tripSections.reduce((sum, trip) => {
                                        return sum + trip.section.length
                                    }, 0) : 0
                                }
                                </TableCell>
                            </TableRow>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                count={tripSections.length}
                                rowsPerPage={rowsPerPage * 2}
                                page={tripPage}
                                onChangePage={handleChangeTripPage}
                            />

                            </TableBody>
                        </Table>
                    </Grid>
                    <Container style={{width: '50%'}} fullWidth={true}>
                        <Grid container direction="row" justify="space-evenly" alignItems="center">
                            <TextField
                                className={classes.filterInputs}
                                fullWidth={true}
                                disabled={autosuggestions}
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
                                disabled={autosuggestions}
                                label="Nazwa punktu"
                                value={name}
                                onChange={handleChangeName}
                            />
                            <div className={classes.filterInputs}>
                                <InputLabel id="slider">
                                    Zakres sumy punktów
                                </InputLabel>
                                <Slider
                                    disabled={autosuggestions}
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
                            <FormControlLabel
                                control={<Switch checked={autosuggestions} onChange={handleChangeAutosuggestions} name="checkedA" />}
                                label="Autosugestie"
                            />
                        </Grid>
                        <div>
                            <Table size="small" stickyHeader aria-label="sticky table">
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
                                    {(autosuggestions && tripSections.length > 0) ?
                                        queryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            if (row.start.locationName ===
                                                (tripSections[tripSections.length - 1].direction ? tripSections[tripSections.length - 1].section.end.locationName :
                                                    tripSections[tripSections.length - 1].section.start.locationName)) {
                                                return (
                                                    <TableRow onClick={event => handleAddNewTripSection(event,{section: row, direction: 1})}
                                                              hover role="checkbox"
                                                              tabIndex={-1} key={data.description}
                                                              style={{height: '61px'}}>
                                                        <TableCell key="name" align="left">
                                                            {row.start.locationName} - {row.end.locationName}
                                                        </TableCell>
                                                        <TableCell key="points" align="left">
                                                            {row.startToEndPoints}
                                                        </TableCell>
                                                        <TableCell key="length" align="left">
                                                            {row.length}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                return (
                                                    <TableRow onClick={event => handleAddNewTripSection(event, {section: row, direction: 0})}
                                                              hover role="checkbox"
                                                              tabIndex={-1} key={data.description}
                                                              style={{height: '61px'}}>
                                                        <TableCell key="name" align="left">
                                                            {row.end.locationName} - {row.start.locationName}
                                                        </TableCell>
                                                        <TableCell key="points" align="left">
                                                            {row.endToStartPoints}
                                                        </TableCell>
                                                        <TableCell key="length" align="left">
                                                            {row.length}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        }) :
                                        (queryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                return (
                                                    <Fragment>
                                                        <TableRow onClick={event => handleAddNewTripSection(event,{section: row, direction: 1})}
                                                                  hover role="checkbox"
                                                                  tabIndex={-1} key={data.description}
                                                                  style={{height: '61px'}}>
                                                            <TableCell key="name" align="left">
                                                                {row.start.locationName} - {row.end.locationName}
                                                            </TableCell>
                                                            <TableCell key="points" align="left">
                                                                {row.startToEndPoints}
                                                            </TableCell>
                                                            <TableCell key="length" align="left">
                                                                {row.length}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow onClick={event => handleAddNewTripSection(event,{ direction: 0, section: row})}
                                                                  hover role="checkbox"
                                                                  tabIndex={-1} key={data.description}
                                                                  style={{height: '61px'}}>
                                                            <TableCell key="name" align="left">
                                                                {row.end.locationName} - {row.start.locationName}
                                                            </TableCell>
                                                            <TableCell key="points" align="left">
                                                                {row.endToStartPoints}
                                                            </TableCell>
                                                            <TableCell key="length" align="left">
                                                                {row.length}
                                                            </TableCell>
                                                        </TableRow>
                                                    </Fragment>
                                                )}
                                            )

                                        )}
                                        </TableBody>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    count={queryData.length}
                                    rowsPerPage={autosuggestions ? 2 * rowsPerPage : rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                />
                            </Table>
                        </div>
                    </Container>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={event => handleCloseEvent(event,props.onClose)} color="primary">
                    Anuluj
                </Button>
                <Button onClick={props.onClose} color="primary">
                    {modifyingState ? "Modyfikuj wycieczkę" : "Dodaj nową wycieczkę"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TripCreator;