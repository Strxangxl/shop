import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";	
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Ratings from "../components/Ratings";
import { Typography, Button, Container, Stack, Card, List, ListItem, FormControl, Select, MenuItem } from '@mui/material';

import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductPage = () => {
	const [qty, setQty] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch()

	const productDetails = useSelector(state => state.productDetails)
	const { loading, error, product } = productDetails

	const { id } = useParams();

	useEffect(() => {
		dispatch(listProductDetails(id))
	}, [dispatch, id])

	
	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`)
	}

	const linkColor = {
		textDecoration: 'none',
		color: 'white'
	}

	const center = {
		justifyContent: 'center',
		paddingLeft: '20px'
	}

	return(
		<>	
				<Button variant="contained" sx={{ marginTop: "50px", marginBottom: '10px' }}>
					<NavLink to="/" style={linkColor}>Go Back</NavLink>
				</Button>

				{loading ? ( <Loader /> ) : error ? ( <Message variant="error">{error}</Message> ) : (
					<Stack direction="row">
					<img src={product.image} alt={product.name} height={250}/>
					<Stack direction="column" sx={center} spacing={4}>
						<Typography variant="h5">{product.name}</Typography>
						<Stack direction="row">
							<Ratings value={product.rating} text={`${product.numReviews} reviews`} />
						</Stack>
						<Typography variant="h6">Price: ${product.price}</Typography>
						<Container maxWidth="sm"><Typography variant="subtitle1">{product.description}</Typography></Container>
					</Stack>
					<Card>
						<List>
							<ListItem>
								<Stack spacing={4} direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography variant="subtitle2">Price:</Typography>
									<Typography variant="subtitle1">${product.price}</Typography>
								</Stack>
							</ListItem>

							<ListItem>
								<Stack spacing={4} direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography variant="subtitle2">Status:</Typography>
									<Typography variant="subtitle2">{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Typography>
								</Stack>
							</ListItem>

							{product.countInStock > 0 && (
								<ListItem>
									<Stack spacing={4} direction="row">
										<Typography variant="subtitle2">Qty:</Typography>
										<FormControl>
											<Select id="qtty" value={qty} label="qty" onChange={(e) => setQty(e.target.value)}>
												{[...Array(product.countInStock).keys()].map((x) => (
													<MenuItem key={x + 1} value={x + 1}>
														{x + 1}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Stack>
								</ListItem>
							)}

							<ListItem>
								<Stack sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
									<Button onClick={addToCartHandler} variant="outlined" disabled={product.countInStock === 0}>Add To Cart</Button>
								</Stack>
							</ListItem>
						</List>
					</Card>
				</Stack>
				)}
				
		</>
	)
}

export default ProductPage;