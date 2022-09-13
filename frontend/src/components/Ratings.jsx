import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import PropTypes from "prop-types";

const Ratings = ({ value, text, color }) => {
	return(
		<>
			<span style={{ color }}>
				{value >= 1 
					? <StarOutlinedIcon /> 
					: value >= 0.5 
					? <StarHalfOutlinedIcon /> 
					: <StarBorderOutlinedIcon />
				}
			</span>
			<span style={{ color }}>
				{value >= 2
					? <StarOutlinedIcon /> 
					: value >= 1.5 
					? <StarHalfOutlinedIcon /> 
					: <StarBorderOutlinedIcon />
				}
			</span>
			<span style={{ color }}>
				{value >= 3
					? <StarOutlinedIcon /> 
					: value >= 2.5 
					? <StarHalfOutlinedIcon /> 
					: <StarBorderOutlinedIcon />
				}
			</span>
			<span style={{ color }}>
				{value >= 4
					? <StarOutlinedIcon /> 
					: value >= 3.5 
					? <StarHalfOutlinedIcon /> 
					: <StarBorderOutlinedIcon />
				}
			</span>
			<span style={{ color }}>
				{value >= 5
					? <StarOutlinedIcon /> 
					: value >= 4.5 
					? <StarHalfOutlinedIcon /> 
					: <StarBorderOutlinedIcon />
				}
			</span>
			<span>{ text && text }</span>
		</>
	)
}

Ratings.defaultProps = {
	color: "#f8e825"
}

Ratings.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
}

export default Ratings;