import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Button, TextField, Box, Grid } from '@mui/material';

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { login } from "../actions/userActions";

const LoginPage = ({ location }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = navigate.search ? navigate.search.split('=')[1] : '/'

	useEffect(() => {
		if(userInfo){
			navigate(redirect)
		}
	}, [navigate, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return(
		<FormContainer>
			<Typography variant="h4">Sign In</Typography>
			{error && <Message variant="error">{error}</Message>}
			{loading && <Loader />}
			<Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
            	<TextField
              		margin="normal"
              		id="email"
              		label="Email Address"
              		name="email"
              		value={email}
              		onChange={(e) => setEmail(e.target.value)}
            	/>
            	<TextField
              		margin="normal"
              		name="password"
              		label="Password"
              		type="password"
              		id="password"
              		value={password}
              		onChange={(e) => setPassword(e.target.value)}
            	/>
            	<Button
              		type="submit"
              		fullWidth
              		variant="contained"
              		sx={{ mt: 3, mb: 2 }}
            	>
              		Sign In
            	</Button>
            </Box>

            <Grid container>
              <Grid item>
                <NavLink to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                  Register
                </NavLink>
              </Grid>
            </Grid>
		</FormContainer>
	)
}

export default LoginPage;