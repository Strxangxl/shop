import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Grid, Box, Container } from '@mui/material';
import { listProducts } from "../actions/productActions";

const HomePage = () => {
	const dispatch = useDispatch()

	const productList = useSelector(state => state.productList)
	const { loading, error, products } = productList

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	return(
		<>	
			<Container maxWidth="md">
				<Box sx={{ flexGrow: 1 }}>
				<h1>Latest Products</h1>
				{loading ? ( <Loader /> ) : error ? ( <Message variant="error">{error}</Message> ) : 
					<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
						{products?.map((product) => (
							<Grid item xs={6} key={product._id}>
								<Product product={product} />
							</Grid>
						))}
					</Grid>
				}		
				</Box>
			</Container>
		</>
	)
}

export default HomePage;