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
    }

}));


const Sections = () => {
    const [data, setData] = useState([]);

    const columns = [
        { id: 'date', label: 'Date' },
        { id: 'value', label: 'Value' },
        { id: 'interpolated', label: 'Interpolated' },
    ];

    const url = 'http://127.0.0.1:8080/api/sections/';

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
        setData(data);
    }

    const classes = useStyles()

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <form noValidate>
                        <Container maxWidth="xl">
                            <Typography variant="h2" component="h1" align="center" color="textPrimary">
                                Przegląd wycieczek w układzie odznak
                            </Typography>
                            <Paper>
                            <Grid container flexWrap="wrap" direction="row" justify="space-evenly" alignItems="center">
                                <GridList>
                                    <Typography variant="h3">
                                        <List aria-label="Odznaki">
                                            {[...Array(30).keys()].map(id =>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="test" />
                                            </ListItem>
                                            )}
                                        </List>
                                    </Typography>
                                </GridList>
                                <GridList>
                                    <Typography variant="h3">
                                        super
                                    </Typography>
                                </GridList>
                                <GridList>
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