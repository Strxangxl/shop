import { Container, Stack } from '@mui/material';

const FormContainer = ({ children }) => {
	return (
		<Container>
			<Stack>{children}</Stack>
		</Container>
	)
}

export default FormContainer;