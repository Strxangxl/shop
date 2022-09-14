import { Alert } from '@mui/material';

const Message = ({ variant, children }) => {
	return(
		<>
			 <Alert severity={variant}>{children}</Alert>
		</>
	)
}

Message.defaultProps = {
	severity: 'info'
}

export default Message;