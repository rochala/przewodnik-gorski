import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Box, MenuItem, TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


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
                        <Container maxWidth="lg">
                            <Typography variant="h2" component="h1" align="center" color="textPrimary">
                                Sections
                            </Typography>
                        </Container>
                    </form>
                </div>
            </main>


        </React.Fragment>

    );

}


export default Sections;