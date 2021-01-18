import * as React from "react";
import { Typography, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


function Copyright() {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Przewodnik górski
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6),
    },
}));


const Footer = () => {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center">
                Przewodnik Górski
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Jędrzej Rochala, Bartłomiej Duda
            </Typography>
            <Copyright />
        </footer>
    )
}

export default Footer