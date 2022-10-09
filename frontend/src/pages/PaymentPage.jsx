import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Button, Box, RadioGroup, Radio,
		FormLabel, FormControlLabel } from '@mui/material';

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { savePaymentMethod } from "../actions/cartActions";

const PaymentPage = () => {
	const cart = useSelector(state => state.cart)
	const { shippingAddress } = cart

	const navigate = useNavigate();

	if(!shippingAddress){
		navigate('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('Paypal')

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate('/placeorder')
	}

	return(
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<Typography variant="h4">Payment Method</Typography>
			<Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
			<FormLabel id="demo-radio-buttons-group-label">Select Payment Method:</FormLabel>
            	<RadioGroup
    				defaultValue="Paypal"
    				name="radio-buttons-group"
  				>
  					<FormControlLabel value="Paypal" control={<Radio />} label="Paypal" 
  					onChange={(e) => setPaymentMethod(e.target.value)}
  					/>
    				<FormControlLabel value="Stripe" control={<Radio />} label="Stripe" 
    				onChange={(e) => setPaymentMethod(e.target.value)}
    				/>
    			</RadioGroup>
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
 
export default PaymentPage;