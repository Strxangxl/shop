import { AppBar, Button, Grid } from '@mui/material';
import { NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return(
		<AppBar position="static">
			<Grid container spacing={2}>
			<Grid item>
				{step1 ? (
				<NavLink to="/login">
					Sign In
				</NavLink>
			) : (
				<Button disabled>Sign In</Button>
			)}
			</Grid>

			<Grid item>
			{step2 ? (
				<NavLink to="/shipping">
					Shipping
				</NavLink>
			) : (
				<Button disabled>Shipping</Button>
			)}
			</Grid>

			<Grid item>
			{step3 ? (
				<NavLink to="/payment">
					Payment
				</NavLink>
			) : (
				<Button disabled>Payment</Button>
			)}
			</Grid>

			<Grid item>
			{step4 ? (
				<NavLink to="/placeorder">
					Place Order
				</NavLink>
			) : (
				<Button disabled>Place Order</Button>
			)}
			</Grid>
			</Grid>
		</AppBar>
	)
}

export default CheckoutSteps;