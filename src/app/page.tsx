"use client";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
import theme from "@/app/theme";
import {useEffect, useState} from "react";

function Page() {

    const [email, setEmail] =useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [hydrated, setHydrated] = React.useState(false);

    const validateEmail = () => {
        const emailRegex: RegExp = new RegExp("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i");
        if(!emailRegex.test(email)) {
            setError(true);
        } else {
            setError(false);
        }
    }

    useEffect(() => {
        validateEmail();
    }, [email]);


    useEffect(() => {
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    /*
   When the button is clicked, this is the event that is fired.
   The first thing we need to do is prevent the default refresh of the page.
   */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        if(process.env['DEBUG']) console.log("handling submit");

        event.preventDefault();

        const bodyData = JSON.stringify({
            email: email,
            password: password
        })

        const response = await fetch(`api/login`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyData
        });
        const responseData = await response.json();
        console.log(responseData);

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main"  maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            error={error}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>




                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>

        </ThemeProvider>)
}

export default Page;