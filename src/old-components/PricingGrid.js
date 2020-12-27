import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import PricingCards from "./PricingCards";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import SignupButton from "./signup-button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 320,
        width: 300,
    },
    control: {
        padding: theme.spacing(10),
    },
}));

export default function SpacingGrid() {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    <Grid  item>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h4" color="textPrimary" gutterBottom>
                                        Free Tier
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        <ul>
                                            <li>Feature1</li>
                                            <li>Feature2</li>
                                            <li>Feature3</li>
                                            <li>Feature4</li>
                                            <li>Feature5</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <SignupButton/>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid  item>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h4" color="textPrimary" gutterBottom>
                                        Premium Tier
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        <ul>
                                            <li>Feature1</li>
                                            <li>Feature2</li>
                                            <li>Feature3</li>
                                            <li>Feature4</li>
                                            <li>Feature5</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <SignupButton/>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid  item>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h4" color="textPrimary" gutterBottom>
                                        Business Tier
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        <ul>
                                            <li>Feature1</li>
                                            <li>Feature2</li>
                                            <li>Feature3</li>
                                            <li>Feature4</li>
                                            <li>Feature5</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <SignupButton/>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
