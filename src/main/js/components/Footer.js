import * as React from "react";
import {Link, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';


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
        padding: theme.spacing(1),
    },
}));


const Footer = () => {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Jędrzej Rochala, Bartłomiej Duda
            </Typography>
            <Copyright/>
        </footer>
    )
}

export default Footer