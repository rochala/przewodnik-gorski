import React from "react";
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";



const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    linkTextDisplay: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'white'
    },
    navIcon: {
        width: '50px',
        height: '50px'
    }
})

const Header = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.navColor}>
            <Toolbar>
                <Container className={classes.navbarDisplayFlex}>
                    { /* zastapic a zmaina linka */}
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                        {props.navLinks.map(({ title, path }) => (
                            <Link key={title} to={path} className={classes.linkTextDisplay}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Header