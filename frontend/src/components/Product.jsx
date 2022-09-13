import { NavLink } from "react-router-dom";
import Ratings from "./Ratings";

import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const Product = ({ product }) => {
	return(
		<Button>
			<Card>
				<NavLink to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
					<CardMedia component="img" img={product.image} alt="product_img" />
						<CardContent>
							<Typography>{product.name}</Typography>
							<Typography variant="subtitle2">
								<Ratings value={product.rating} text={`${product.numReviews} reviews`} />
							</Typography>
							<Typography variant="h5">${product.price}</Typography>
						</CardContent>
                </NavLink>
			</Card>
		</Button>
	)
}

export default Product;