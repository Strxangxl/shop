import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Button, TextField, Box, Container, Stack } from '@mui/material';

import Message from "../components/Message";
import Loader from "../components/Loader";

import { getUserDetails, updateUser } from "../actions/userActions";

const ProfilePage = ({ location }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const userDetails = useSelector(state => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const userUpdate = useSelector(state => state.userUpdate)
	const { success } = userUpdate

	useEffect(() => {
		if(!userInfo){
			navigate('/login')
		} else {
				if(!user.name){
					dispatch(getUserDetails('profile'))
				} else {
					setName(user.name)
					setEmail(user.email)
				}
		}
	}, [dispatch, navigate, userInfo, user])

	const submitHandler = (e) => {
		e.preventDefault()
		if(password !== confirmPassword){
			setMessage("Passwords do not match!!")
		} else {
			dispatch(updateUser({ id: user._id, name, email, password }))
		}
	}

	return(
		<Container>
			<Stack spacing={2}>
				<Typography variant="h4">User Profile</Typography>
			{message && <Message variant="error">{message}</Message>}
			{error && <Message variant="error">{error}</Message>}
			{success && <Message variant="success">Profile Updated!!</Message>}
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
              		Update
            	</Button>
            </Box>
			</Stack>
			<Stack>
				<Typography variant="h4">My Orders:</Typography>
			</Stack>
		</Container>
	)
}

export default ProfilePage;