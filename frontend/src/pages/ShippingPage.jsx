import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Button, TextField, Box } from '@mui/material';

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { saveShippingAddress } from "../actions/cartActions";

const ShippingPage = () => {
	const cart = useSelector(state => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const dispatch = useDispatch()

	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		navigate('/payment')
	}

	return(
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<Typography variant="h4">Shipping</Typography>
			<Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
				<TextField
              		margin="normal"
              		id="address"
              		label="Address"
              		name="address"
              		value={address}
              		onChange={(e) => setAddress(e.target.value)}
            	/>
            	<TextField
              		margin="normal"
              		id="city"
              		label="City"
              		name="city"
              		value={city}
              		onChange={(e) => setCity(e.target.value)}
            	/>
            	<TextField
              		margin="normal"
              		name="postal_code"
              		label="Postal Code"
              		id="postal_code"
              		value={postalCode}
              		onChange={(e) => setPostalCode(e.target.value)}
            	/>
            	<TextField
              		margin="normal"
              		name="country"
              		label="Country"
              		id="country"
              		value={country}
              		onChange={(e) => setCountry(e.target.value)}
            	/>
            	<Button
              		type="submit"
              		fullWidth
              		variant="contained"
              		sx={{ mt: 3, mb: 2 }}
            	>
              		Continue
            	</Button>
			</Box>
		</FormContainer>
	)
}
 
export default ShippingPage;