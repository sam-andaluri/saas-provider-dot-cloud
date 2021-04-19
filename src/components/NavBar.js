import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

export default function NavBar() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" align={"left" }noWrap className={classes.toolbarTitle}>
                        Tiddler Inc.
                    </Typography>
                    {/*<nav>*/}
                    {/*    <Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                    {/*        Features*/}
                    {/*    </Link>*/}
                    {/*    <Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                    {/*        Enterprise*/}
                    {/*    </Link>*/}
                    {/*    <Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                    {/*        Support*/}
                    {/*    </Link>*/}
                    {/*</nav>*/}
                    <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={() => history.replace("/profile")}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
