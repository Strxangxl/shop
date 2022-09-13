import React, { useState, useEffect } from "react";
import axios from "axios";

import { NavLink, useParams } from "react-router-dom";

import Ratings from "../components/Ratings";
import { Typography, Button, Container, Stack, Card, List, ListItem } from '@mui/material';

const ProductPage = () => {

	const { id } = useParams();
	
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${id}`)

			setProduct(data);
		}

		fetchProduct();
	}, [id])

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

							<ListItem>
								<Stack sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
									<Button variant="outlined" disabled={product.countInStock === 0}>Add To Cart</Button>
								</Stack>
							</ListItem>
						</List>
					</Card>
				</Stack>
		</>
	)
}

export default ProductPage;