import React, {useEffect, useState} from "react";
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
import Sections from "./Sections";
import TripCreator from "./TripCreator";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";


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
        width: "30%"
    },
    sliderFix: {
        padding: "15px 0px 0px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


const Badges = () => {
    const [badges, setBadges] = useState([]);
    const [userID, setUserID] = useState("");
    const [selectedBadge, setSelectedBadge] = useState(-1)
    const [selectedTrip, setSelectedTrip] = useState(-1)
    const [open, setOpen] = useState(false);
    const [modifying, setModifying] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = 'http://127.0.0.1:8080/api/users/?email=b.duda11@wp.pl';

    const classes = useStyles()

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then(json => {
                setBadges(json[0].badges);
                setUserID(json[0].id);
            })
    }, []);

    const handleBadgeSelect = (event, value) => {
        setSelectedBadge(value)
        setSelectedTrip(-1)
    }

    const handleTripSelect = (event, value) => {
        setSelectedTrip(value)
    }

    const handleNewTripDialogOpen = (event) => {
        setOpen(true)
    }

    const handleNewTripDialogClose = (event) => {
        setOpen(false)
        setModifying([])
    }

    const handleModyifing = (event) => {
        setModifying(badges[selectedBadge].trips[selectedTrip])
        setOpen(true)
    }

    const handleSendData = (event) => {
        setLoading(true);
        setTimeout(() =>
        fetch(url)
            .then((response) => response.json())
            .then(json => {
                setBadges(json[0].badges);
                setUserID(json[0].id);
            }), 1000);
        setSelectedTrip(-1);
        setOpen(false);
        setTimeout(() => setLoading(false), 1500);
    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.heroContent}>
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h2" align="center" color="textPrimary">
                        Przegląd wycieczek w układzie odznak
                    </Typography>
                    <hr/><br/>
                    <Grid container className={classes.element} flexWrap="wrap" direction="row" justify="space-evenly" alignItems="center">
                        <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '25%'}}>
                            <Container style={{height: '100%', overflow: 'clip'}}>
                                <div>
                                    <Typography variant="h4" align="center">
                                        Odznaki
                                    </Typography>
                                    <hr />
                                </div>
                                <List aria-label="Odznaki" className={classes.list} style={{height: 'calc(100% - 60px)'}}>
                                    {badges.map((badge, index) =>
                                        <ListItem button
                                                  onClick={(event) => handleBadgeSelect(event, index)}
                                                  selected={selectedBadge === index}
                                        >
                                            <ListItemIcon>
                                                {badge.dateAcquired != null &&
                                                <StarIcon />
                                                }
                                            </ListItemIcon>
                                            <ListItemText primary={badge.grade} />
                                        </ListItem>
                                    )}
                                </List>
                            </Container>
                        </Paper>
                        <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '40%'}}>
                            {selectedBadge >= 0 &&
                            <Container style={{height: '100%', overflow: 'clip'}}>
                                <div>
                                    <Typography variant="h4" align="center">
                                        {badges[selectedBadge].grade}
                                    </Typography>
                                    <hr/>
                                    <Typography variant="h6" align="left" className={classes.spacedText}>
                                        Liczba punktów: {badges[selectedBadge].sumPointForBadge} / {badges[selectedBadge].pointsNeeded}
                                    </Typography>
                                    <Typography variant="h6" align="left" className={classes.spacedText}>
                                        {(badges[selectedBadge].dateAcquired != null) ? "Odznaka zdobyta dnia: " + badges[selectedBadge].dateAcquired.slice(0,10) : "Odznaka nie jest zdobyta"}
                                    </Typography>
                                    <hr/>
                                    <Button fullWidth={true} variant="outlined" onClick={handleNewTripDialogOpen} disabled={badges[selectedBadge].dateAcquired != null}>
                                        Dodaj nową wycieczkę
                                    </Button>
                                    <hr/>
                                </div>
                                <List aria-label="Odznaki" className={classes.list} style={{height: 'calc(100% - 210px)'}}>
                                    {badges[selectedBadge].trips.map((trip, index) =>
                                        <ListItem button
                                                  className={classes.list}
                                                  onClick={(event) => handleTripSelect(event, index)}
                                                  selected={selectedTrip === index}
                                        >
                                            <ListItemText primary={trip.tripName} secondary={
                                                "Data wycieczki: " + (trip.startDate === trip.endDate ? trip.startDate : trip.startDate + ' - ' + trip.endDate  )
                                            }/>
                                        </ListItem>
                                    )}
                                </List>
                            </Container>
                            }
                        </Paper>
                        <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '35%'}}>
                            {selectedTrip >= 0 &&
                            <Container style={{height: '100%', overflow: 'clip'}}>
                                <div>
                                    <Grid container direction="row" justify="space-between">
                                        <div>
                                        </div>
                                        <Typography variant="h4" align="center">
                                            Wycieczka
                                        </Typography>
                                        <IconButton aria-label="delete" onClick={handleModyifing} disabled={(badges[selectedBadge].dateAcquired != null) || (badges[selectedBadge].trips[selectedTrip].status === "Zatwierdzona")} >
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                    <hr/>
                                    <Typography variant="h6" align="left" className={classes.spacedText}>
                                        Liczba punktów: {badges[selectedBadge].trips[selectedTrip].sumPoints}
                                    </Typography>
                                    <Typography variant="h6" align="left" className={classes.spacedText}>
                                        Data odbycia: {(badges[selectedBadge].trips[selectedTrip].startDate ===
                                    badges[selectedBadge].trips[selectedTrip].endDate ?
                                        badges[selectedBadge].trips[selectedTrip].startDate :
                                        badges[selectedBadge].trips[selectedTrip].startDate + ' - ' +
                                        badges[selectedBadge].trips[selectedTrip].endDate  )}
                                    </Typography>
                                    <Typography variant="h6" align="left" className={classes.spacedText}>
                                        Status: {badges[selectedBadge].trips[selectedTrip].status}
                                    </Typography>
                                    <Typography variant="h6" align="left" className={classes.spacedText}>
                                        Obecność przodownika: {badges[selectedBadge].trips[selectedTrip].leaderAttendance ? " Tak" : " Nie"}
                                    </Typography>
                                    <hr/>
                                </div>
                                <List aria-label="Trasy wycieczki" className={classes.list} style={{height: 'calc(100% - 242px'}}>
                                    {badges[selectedBadge].trips[selectedTrip].tripSection.map((trip) =>
                                        <ListItem
                                        >
                                            <ListItemText primary={
                                                (trip.direction ? trip.section.start.locationName + ' - ' + trip.section.end.locationName : trip.section.end.locationName + ' - ' + trip.section.start.locationName)
                                            } secondary={"Liczba punktów: " + (trip.direction ? trip.section.startToEndPoints : trip.section.endToStartPoints )}
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </Container>
                            }
                        </Paper>
                    </Grid>
                </Container>
            </div>
            <TripCreator onSend={handleSendData} open={open} modifying={modifying} requestData={[userID,  selectedBadge >= 0 ? badges[selectedBadge].id : ""]} onOpen={handleNewTripDialogOpen} onClose={handleNewTripDialogClose} style={{height: '75vh', maxHeight: '75vh'}} />
        </React.Fragment>

    );

}


export default Badges;