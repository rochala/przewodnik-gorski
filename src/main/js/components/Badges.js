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
    textField: {
        "& .MuiFormLabel-root": {
            color: "red",
        },
        "& .MuiInput-underline::before": {
            borderColor: "red",
        },
    },
    list: {
        width: '100% !important',
    },
    element: {
        height: '60vh'
    }

}));


const Sections = () => {
    const [badges, setBadges] = useState([]);
    const [badgeData, setBadgeData] = useState([]);
    const [selectedBadge, setSelectedBadge] = useState(-1)

    const url = 'http://127.0.0.1:8080/api/users/badges/?email=b.duda11@wp.pl';

    const classes = useStyles()

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then(json => setBadges(json))
    }, []);

    const handleBadgeSelect = (event, value) => {
        fetch("http://127.0.0.1:8080/api/badges/?tripsBadgeId=" + badges[value].id)
            .then((response) => response.json())
            .then(json => setBadgeData(json))
        setSelectedBadge(value)
    }

    const BadgeInformation = () => {
        return (
            <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '45%'}}>
                {selectedBadge >= 0 &&
                <Typography variant="h3" align="center">
                    {badges[selectedBadge].grade}
                </Typography>
                }
            </Paper>
        )
    }

    const BadgeList = () => {
        return (
        <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '20%'}}>
            <Typography variant="h3" align="center">
                Odznaki
            </Typography>
            <hr />
            <List aria-label="Odznaki" className={classes.list} p={2}>
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
        </Paper>
        )
    }

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <form noValidate>
                        <Container maxWidth="xl">
                            <Typography variant="h2" component="h2" align="center" color="textPrimary">
                                Przegląd wycieczek w układzie odznak
                            </Typography>
                            <Paper>
                                <hr/><br/>
                            <Grid container className={classes.element} flexWrap="wrap" direction="row" justify="space-evenly" alignItems="center">
                                <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '20%'}}>
                                    <Typography variant="h3" align="center">
                                        Odznaki
                                    </Typography>
                                    <hr />
                                    <List aria-label="Odznaki" className={classes.list} p={2}>
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
                                </Paper>
                                <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '45%'}}>
                                    {selectedBadge >= 0 &&
                                        <Container>
                                        <Typography variant="h3" align="center">
                                            {badges[selectedBadge].grade}
                                        </Typography> &&
                                        <Typography variant="h5" align="left">
                                        {badges[selectedBadge].sumPointForBadge} / {badges[selectedBadge].pointsNeeded}
                                        </Typography> &&
                                        <Typography variant="h5" align="left">
                                        {(badges[selectedBadge].dateAcquired != null) ? "Odznaka zdobyta dnia: " + badges[selectedBadge].dateAcquired : "Odznaka nie jest zdobyta"}
                                        </Typography>
                                        </Container>
                                    }
                                </Paper>
                                <Paper elevation={3} className={classes.element} alignItems="center" style={{width: '35%'}}>
                                    <Typography variant="h3" align="center">
                                        super
                                    </Typography>
                                </Paper>
                            </Grid>
                            </Paper>
                        </Container>
                    </form>
                </div>
            </main>
        </React.Fragment>

    );

}


export default Sections;