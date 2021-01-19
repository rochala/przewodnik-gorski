import React, {useEffect, useState} from "react";
import {Container, Grid, GridList, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";



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
        width: '30%',
        height: '60vh'
    }

}));


const Sections = () => {
    const [badges, setBadges] = useState([]);

    const url = 'http://127.0.0.1:8080/api/users/badges/?email=b.duda11@wp.pl';

    const classes = useStyles()

    useEffect(() => {
        loadData(url);
    }, []);

    const loadData = async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
        });
        const data = await response.json()
        setBadges(data);
    }

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <form noValidate>
                        <Container maxWidth="lg">
                            <Typography variant="h2" component="h2" align="center" color="textPrimary">
                                Przegląd wycieczek w układzie odznak
                            </Typography>
                            <Paper>
                                <hr/><br/>
                            <Grid container flexWrap="wrap" direction="row" justify="space-evenly" alignItems="center">
                                <GridList className={classes.element}>
                                    <Typography variant="h3">
                                        Odznaki
                                    </Typography>
                                    <List aria-label="Odznaki" className={classes.list}>
                                        {badges.map(id =>
                                        <ListItem button className={classes.list}>
                                            <ListItemIcon>
                                                <StarIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="arstarstarstatest" />
                                        </ListItem>
                                        )}
                                    </List>
                                </GridList>
                                <GridList className={classes.element}>
                                    <Typography variant="h3">
                                        super
                                    </Typography>
                                </GridList>
                                <GridList className={classes.element}>
                                    <Typography variant="h3">
                                        super
                                    </Typography>
                                </GridList>
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