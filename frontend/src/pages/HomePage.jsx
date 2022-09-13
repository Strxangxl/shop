import React, { useState, useEffect } from "react";
import axios from "axios";

import Product from "../components/Product";

import { Grid, Box, Container } from '@mui/material';

const HomePage = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get("/api/products")

			setProducts(data);
		}

		fetchProducts()
	}, [])

	return(
		<>	
			<Container maxWidth="md">
				<Box sx={{ flexGrow: 1 }}>
				<h1>Latest Products</h1>
					<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
						{products?.map((product) => (
							<Grid item xs={6} key={product._id}>
								<Product product={product} />
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</>
	)
}

export default HomePage;