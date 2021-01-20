import React, {useEffect, useState} from "react";
import {Container, Grid, GridList, Typography} from "@material-ui/core";
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



const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    list: {
        width: '100% !important',
        overflow: 'auto',
        scrollbarColor: 'rgb(107, 107, 107) rgb(43, 43, 43)'
    },
    element: {
        height: '63vh',
    },
    spacedText: {
        padding: '5px'
    }

}));


const Sections = () => {
    const [badges, setBadges] = useState([]);
    const [badgeData, setBadgeData] = useState([]);
    const [selectedBadge, setSelectedBadge] = useState(-1)
    const [selectedTrip, setSelectedTrip] = useState(-1)

    const url = 'http://127.0.0.1:8080/api/users/badges/?email=b.duda11@wp.pl';

    const classes = useStyles()

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then(json => setBadges(json))
    }, []);

    const handleBadgeSelect = (event, value) => {
        setSelectedBadge(value)
        setSelectedTrip(-1)
    }

    const handleTripSelect = (event, value) => {
        setSelectedTrip(value)
    }

    return (
        <React.Fragment>
                <div className={classes.heroContent}>
                        <Container maxWidth="lg">
                            <Typography variant="h2" component="h2" align="center" color="textPrimary">
                                Przegląd wycieczek w układzie odznak
                            </Typography>
                            <hr/><br/>
                                <Grid container className={classes.element} flexWrap="wrap" direction="row" justify="space-evenly" alignItems="center">
                                    <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '30%'}}>
                                        <Container>
                                        <Container>
                                            <Typography variant="h3" align="center">
                                                Odznaki
                                            </Typography>
                                            <hr />
                                        </Container>
                                                <List aria-label="Odznaki" className={classes.list} style={{height:'50vh'}}>
                                                    {badges.map((badge, index) =>
                                                        <ListItem button
                                                                  className={classes.list}
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
                                    <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '35%'}}>
                                        {selectedBadge >= 0 &&
                                        <div>
                                            <Container style={{height: '30%'}}>
                                                <Typography variant="h3" align="center">
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
                                            </Container>
                                            <Container style={{height: '70%'}}>
                                                <List aria-label="Odznaki" className={classes.list} p={2} style={{height:'38vh'}}>
                                                    <ListItem button
                                                              className={classes.list}
                                                              onClick={(event) => alert("Tutaj bedzie dodanie wycieczki")}
                                                              >
                                                         <ListItemText primary="Dodaj nową wycieczkę"/>
                                                    </ListItem>
                                                    <hr/>
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
                                        </div>
                                        }
                                    </Paper>
                                    <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '35%'}}>
                                        {selectedTrip >= 0 &&
                                        <div>
                                            <Container style={{height: '30%'}}>
                                                <Typography variant="h3" align="center">
                                                    Wycieczka
                                                </Typography>
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
                                            </Container>
                                            <Container style={{height: '70%'}}>
                                                <List aria-label="Odznaki" className={classes.list} p={2} style={{height:'32vh'}}>
                                                    {badges[selectedBadge].trips[selectedTrip].tripSection.map((trip) =>
                                                        <ListItem button
                                                                  className={classes.list}
                                                        >
                                                            <ListItemText primary={
                                                                (trip.direction ? trip.section.start.locationName + ' - ' + trip.section.end.locationName : trip.section.end.locationName + ' - ' + trip.section.start.locationName)
                                                            } secondary={"Liczba punktów: " + (trip.direction ? trip.section.startToEndPoints : trip.section.endToStartPoints )}
                                                            />
                                                        </ListItem>
                                                    )}
                                                </List>
                                            </Container>
                                        </div>
                                        }
                                    </Paper>
                                </Grid>
                        </Container>
                </div>
        </React.Fragment>

    );

}


export default Sections;