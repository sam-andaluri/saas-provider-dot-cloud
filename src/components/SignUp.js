import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useAuth0} from "@auth0/auth0-react";
import {useHistory, useLocation} from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit'
import request from 'request';

const clientId = process.env.REACT_APP_TENANT_API_CLIENT_ID;
const clientSecret = process.env.REACT_APP_TENANT_API_CLIENT_SECRET;
const audience = process.env.REACT_APP_TENANT_API_AUDIENCE;

const store = configureStore({ reducer: tenantReducer })

function tenantReducer(state, action) {
    // Check to see if the reducer cares about this action
    if (action.type === 'tenant/update') {
        // If so, make a copy of `state`
        return {
            ...state,
            tenant: action.payload
        }
    }
    // otherwise return the existing state unchanged
    return state
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://saas-provider.cloud/">
                SaaS Provider
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const { user } = useAuth0();
    const { name, email } = user;
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    const tier = new URLSearchParams(useLocation().search).get("tier")
    store.dispatch({ type: 'tenant/update', payload: {tenant: {firstName: firstName, lastName: lastName, tier: tier}} })
    const history = useHistory();

    async function handleSubmit(event) {
        console.log(name)
        console.log(email)
        console.log(tier)
        event.preventDefault()
        var body = {
            "client_id":clientId,
            "client_secret":clientSecret,
            "audience":audience,
            "grant_type":"client_credentials"
        }
        var options = { method: 'POST',
            url: 'https://saas-provider.us.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body) };

        request(options, async function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            var token = JSON.parse(body)["access_token"]
            console.log("Token = " + token)
            let tenant_api_options = { 'method': 'POST',
                headers: { Authorization : 'Bearer ' + token, 'Content-Type': 'application/json' },
                body: JSON.stringify({"name": name, "email": email, "tier": tier})
            }

            let responseData = fetch("https://tenant-api.saas-provider.cloud/tenant", tenant_api_options)
            //let responseData = await fetch("http://localhost:8000/tenant", tenant_api_options)
            let tenant_resp = await responseData.json();
            console.log(tenant_resp.tenant_url)
            store.dispatch({ type: 'tenant/update', payload: {tenant: {firstName: firstName, lastName: lastName, tier: tier, domain: tenant_resp.tenant_url}} })
            history.replace("/profile?url="+tenant_resp.tenant_url)
        });



    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value = {lastName}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value = {email}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="tier"
                                label="Tier"
                                type="text"
                                value={tier}
                                id="tier"
                                disabled={true}
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <TextField*/}
                        {/*        variant="outlined"*/}
                        {/*        required*/}
                        {/*        fullWidth*/}
                        {/*        name="domain"*/}
                        {/*        label="Domain"*/}
                        {/*        type="text"*/}
                        {/*        value={store.getState().tenant.domain}*/}
                        {/*        id="domain"*/}
                        {/*        disabled={true}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
