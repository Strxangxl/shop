import { LoadingButton } from '@mui/lab';

const Loader = () => {
	return(
		<>
			<LoadingButton loading variant="outlined">
				<span>Loading......</span>
			</LoadingButton>
		</>
	)
}

export default Loader;