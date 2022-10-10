import React, { useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Button, Stack, Card, Container, Grid,
		List, ListItem, CardContent, CardActions } from '@mui/material';

import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceorderPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cart = useSelector(state => state.cart)

	const addDecimals = (num) => {
		return (
			Math.round(num * 100) / 100
		).toFixed(2)
	}

	cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
	cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

	const orderCreate = useSelector(state => state.orderCreate)
	const { order, success, error } = orderCreate

	useEffect(() => {
		if(success){
			navigate(`/order/${order._id}`)
		}
		// eslint-disable-next-line
	}, [navigate, success])

	const placeOrderHandler = () => {
		dispatch(createOrder({
			orderItems: cart.cartItems,
			shippingAddress: cart.shippingAddress,
			paymentMethod: cart.paymentMethod,
			itemsPrice: cart.itemsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice,
		}))
	}

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Container>
				<Grid spacing={4}>
					<Grid item>
						<Typography variant="h4">Shipping</Typography>
						<p>
							<Typography variant="h5">Address</Typography>
							{cart.shippingAddress.address},
							{cart.shippingAddress.city}, {' '}
							{cart.shippingAddress.postalCode},{' '}
							{cart.shippingAddress.country}
						</p>
					</Grid>
					<Grid item>
						<Typography variant="h5">Payment Method</Typography>
						<Typography variant="subtitle1">Method: 
						{cart.paymentMethod}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h5">Order Items</Typography>
						{cart.cartItems.length === 0 ? (
							<Message>Your Cart is Empty!!!</Message>
						) : (
							<List>
								{cart.cartItems.map((item, index) => (
									<ListItem item key={index}>
										<Stack direction="row">
											<img src={item.image} alt={item.name} height={80}/>
										</Stack>
										<Stack>
											<NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
										</Stack>
										<Stack>
											{item.qty} x ${item.price} = ${item.qty * item.price}
										</Stack>
									</ListItem>
								))}
							</List>
						)}
					</Grid>
					<Grid item>
						<Card>
							<CardContent>
								<Typography variant="subtitle1">Order Summary</Typography>

								<Stack direction="row" spacing={8}>
								<Typography variant="subtitle2">Items</Typography>
								<Stack>${cart.itemsPrice}</Stack>
								</Stack>

								<Stack direction="row" spacing={8}>
								<Typography variant="subtitle1">Shipping</Typography>
								<Stack>${cart.shippingPrice}</Stack>
								</Stack>

								<Stack direction="row" spacing={8}>
								<Typography variant="subtitle1">Tax</Typography>
								<Stack>${cart.taxPrice}</Stack>
								</Stack>

								<Stack direction="row" spacing={8}>
								<Typography variant="subtitle1">Total</Typography>
								<Stack>${cart.totalPrice}</Stack>
								</Stack>
							</CardContent>
							{error && <Message variant="error">{error}</Message>}
							<CardActions>
								 <Button variant="contained" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
								 	<NavLink to={"/order/:id"}>Place Order</NavLink>
								 </Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default PlaceorderPage;