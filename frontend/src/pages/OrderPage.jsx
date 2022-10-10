import React, { useEffect, useState } from 'react';
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Stack, Card, Container, Grid,
		List, ListItem, CardContent, CardActions } from '@mui/material';

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants"; 

const OrderPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams();
	const orderId = id

	const [sdkReady, setSdkReady] = useState(false)

	const orderDetails = useSelector(state => state.orderDetails)
	const { order, loading, error } = orderDetails

	const orderPay = useSelector(state => state.orderPay)
	const { loading: loadingPay, success: successPay } = orderPay

		if(!loading){
		const addDecimals = (num) => {
			return (
				Math.round(num * 100) / 100
			).toFixed(2)
		}
		order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
	}

	useEffect(() => {
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal')
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
			script.async = true
			script.onload = () => {
				setSdkReady(true)
			}
			document.body.appendChild(script)
		}

    	if(!order || successPay) {
    		dispatch({ type: ORDER_PAY_RESET })
        	dispatch(getOrderDetails(orderId))
    	} else if(!order.isPaid){
    		if(!window.paypal){
    			addPaypalScript()
    		} else {
    			setSdkReady(true)
    		}
    	}
	}, [orderId, dispatch, successPay, order]) 

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult))
	}

	return loading ? <Loader /> : error ? <Message variant="error">{error}</Message> : 
		<>
			<h2>Order {order._id}</h2>
			<Container>
				<Grid spacing={4}>
					<Grid item>
						<Typography variant="h4">Shipping</Typography>
						<p>
							<Typography variant="h6">Name: {order.user.name}</Typography>
							Email : <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
						</p>
						<p>
							<Typography variant="h5">Address</Typography>
							{order.shippingAddress.address},
							{order.shippingAddress.city}, {' '}
							{order.shippingAddress.postalCode},{' '}
							{order.shippingAddress.country}
						</p>
						{order.isDelivered ? <Message variant="success">Paid on {order.deliveredAt}</Message>
							: <Message variant="error">Not Delivered!!</Message>}
					</Grid>
					<Grid item>
						<Typography variant="h5">Payment Method</Typography>
						<p>
							<Typography variant="subtitle1">Method: 
								{order.paymentMethod}
							</Typography>
						</p>
						{order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>
							: <Message variant="error">Not Paid!!</Message>}
					</Grid>
					<Grid item>
						<Typography variant="h5">Order Items</Typography>
						{order.orderItems.length === 0 ? (
							<Message>Order is Empty!!!</Message>
						) : (
							<List>
								{order.orderItems.map((item, index) => (
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
								<Stack>${order.itemsPrice}</Stack>
								</Stack>

								<Stack direction="row" spacing={8}>
								<Typography variant="subtitle1">Shipping</Typography>
								<Stack>${order.shippingPrice}</Stack>
								</Stack>

								<Stack direction="row" spacing={8}>
								<Typography variant="subtitle1">Tax</Typography>
								<Stack>${order.taxPrice}</Stack>
								</Stack>

								<Stack direction="row" spacing={8}>
								<Typography variant="subtitle1">Total</Typography>
								<Stack>${order.totalPrice}</Stack>
								</Stack>
							</CardContent>
							<CardActions>
								{!order.isPaid && (
									<Stack direction="row" spacing={8}>
									{loadingPay && <Loader />}
									{!sdkReady ? ( <Loader /> ) : (
										<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
									)}
									</Stack>
								)}
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</>
}

export default OrderPage;