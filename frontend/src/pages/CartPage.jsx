import React, { useEffect } from "react";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message"
import { addToCart, removeFromCart } from "../actions/cartActions";

import { Typography, Button, Container, Stack, List, ListItem, FormControl, Select, MenuItem } from '@mui/material';

const CartPage = () => {
	const { id } = useParams();
	const productId = id;

	let location = useLocation();
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	const cart = useSelector(state => state.cart)
	const { cartItems } = cart;

	useEffect(() => {
		if(productId){
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const navigate = useNavigate();
	const checkOutHandler = () => {
		navigate('/login?redirect=shipping')
	}

	return(
		<Container>
			<Stack>
				<Typography variant="h5">Shopping Cart</Typography>
				{cartItems.length === 0 
					? ( <Message>Your Cart is Empty <NavLink to="/">Go Back</NavLink></Message> )
					: ( <List>
							{cartItems.map((item) => (
								<ListItem key={item.product}>
									<Stack direction="row">
										<img src={item.image} alt={item.name} height={100}/>
									</Stack>
									<Stack>
										<NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
									</Stack>
									<Stack>${item.price}</Stack>
									<Stack spacing={5}>
										<FormControl>
											<Select id="qty" value={item.qty} label="qty" onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
												{[...Array(item.countInStock).keys()].map((x) => (
													<MenuItem key={x + 1} value={x + 1}>
														{x + 1}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Stack>
									<Button variant="outlined" onClick={() => removeFromCartHandler(item.product)}>
										Remove
									</Button>
								</ListItem>
							))}
							<ListItem>
								<Typography variant="h5">
									Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})		
								</Typography>
								${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
							</ListItem>
							<ListItem>
								<Button disabled={cartItems.length === 0} onClick={checkOutHandler}>
									Proceed to Checkout
								</Button>
							</ListItem>
						</List>
					   )}
			</Stack>
		</Container>
	)
}

export default CartPage;;