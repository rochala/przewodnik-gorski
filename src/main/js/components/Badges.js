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



const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    list: {
        width: '100% !important',
        overflow: 'auto',
    },
    element: {
        height: '60vh',
    },
    spacedText: {
        padding: '15px'
    },
    badgeList: {
        maxHeight: '90%'
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
    }

    const handleTripSelect = (event, value) => {
        setSelectedTrip(value)
    }

    return (
        <React.Fragment>
                <div className={classes.heroContent}>
                        <Container maxWidth="xl">
                            <Typography variant="h2" component="h2" align="center" color="textPrimary">
                                Przegląd wycieczek w układzie odznak
                            </Typography>
                            <hr/><br/>
                                <Grid container className={classes.element} flexWrap="wrap" direction="row" justify="space-evenly" alignItems="center">
                                    <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '20%'}}>
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
                                    <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '45%'}}>
                                        {selectedBadge >= 0 &&
                                        <div>
                                            <Container style={{height: '30%'}}>
                                                <Typography variant="h3" align="center">
                                                    {badges[selectedBadge].grade}
                                                </Typography>
                                                <hr/>
                                                <Typography variant="h5" align="left" className={classes.spacedText}>
                                                    Liczba punktów: {badges[selectedBadge].sumPointForBadge} / {badges[selectedBadge].pointsNeeded}
                                                </Typography>
                                                <Typography variant="h5" align="left" className={classes.spacedText}>
                                                    {(badges[selectedBadge].dateAcquired != null) ? "Odznaka zdobyta dnia: " + badges[selectedBadge].dateAcquired.slice(0,10) : "Odznaka nie jest zdobyta"}
                                                </Typography>
                                                <hr/>
                                            </Container>
                                            <Container style={{height: '70%'}}>
                                                <List aria-label="Odznaki" className={classes.list} p={2}>
                                                    <ListItem button
                                                              className={classes.list}
                                                              onClick={(event) => alert("Tutaj bedzie dodanie wycieczki")}
                                                              >
                                                         <ListItemText primary="Dodaj nową wycieczkę"/>
                                                    </ListItem>
                                                    {badges[selectedBadge].trips.map((trip, index) =>
                                                        <ListItem button
                                                                  className={classes.list}
                                                                  onClick={(event) => handleTripSelect(event, index)}
                                                                  selected={selectedTrip === index}
                                                        >
                                                            <ListItemText primary={trip.startDate} />
                                                        </ListItem>
                                                    )}
                                                </List>
                                            </Container>
                                        </div>
                                        }
                                    </Paper>
                                    <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '35%'}}>
                                        <Typography variant="h3" align="center">
                                            super
                                        </Typography>
                                    </Paper>
                                </Grid>
                        </Container>
                </div>
        </React.Fragment>

    );

}


export default Sections;