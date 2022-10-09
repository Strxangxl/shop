import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Button, TextField, Box, Grid } from '@mui/material';

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { register } from "../actions/userActions";

const RegisterPage = ({ location }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const userRegister = useSelector(state => state.userRegister)
	const { loading, error, userInfo } = userRegister

	const redirect = navigate.search ? navigate.search.split('=')[1] : '/'

	useEffect(() => {
		if(userInfo){
			navigate(redirect)
		}
	}, [navigate, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		if(password !== confirmPassword){
			setMessage("Passwords do not match!!")
		} else {
			dispatch(register(name, email, password))
		}
	}

	return(
		<FormContainer>
			<Typography variant="h4">Sign Up</Typography>
			{message && <Message variant="error">{message}</Message>}
			{error && <Message variant="error">{error}</Message>}
			{loading && <Loader />}
			<Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
            	<TextField
              		margin="normal"
              		id="name"
              		label="Name"
              		name="name"
              		value={name}
              		onChange={(e) => setName(e.target.value)}
            	/>
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
            	<TextField
              		margin="normal"
              		name="confirm_password"
              		label="Confirm Password"
              		type="password"
              		id="confirm_password"
              		value={confirmPassword}
              		onChange={(e) => setConfirmPassword(e.target.value)}
            	/>
            	<Button
              		type="submit"
              		fullWidth
              		variant="contained"
              		sx={{ mt: 3, mb: 2 }}
            	>
              		Register
            	</Button>
            </Box>

            <Grid container>
              <Grid item>
              	Have an Account already?
                <NavLink to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Login
                </NavLink>
              </Grid>
            </Grid>
		</FormContainer>
	)
}

export default RegisterPage;