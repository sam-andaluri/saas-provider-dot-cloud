import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="column"
                  justify="center"
                  alignItems="stretch"
                  spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" align={"center"} gutterBottom>
                            This is a sample application for Manning's liveProject Series "Architecting Multi Cloud SaaS Applications"
                        </Typography>
                        <Typography variant="h6" align={"center"} gutterBottom>
                            As a Software as a Service Provider, we offer multiple subscription tiers each with a feature set. Once you select a tier, we will create a tenant application on our Kubernetes platform.
                        </Typography>
                        <Typography variant="h6" align={"center"} gutterBottom>
                            Our SaaS application runs on Amazon EKS (Amazon Web Services). Soon we will be supporting Google Cloud Platform.
                        </Typography>
                        <Typography variant="h6" align={"center"} gutterBottom>
                            All tenants login to their application using tenantid.saas-tenant.cloud. The login button in the top right corner is for logging in as a Provider.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
