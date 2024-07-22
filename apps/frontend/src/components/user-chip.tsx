import { Avatar, Chip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";

const CustomChip = styled(Chip)(({ theme }) => ({
	"& .MuiChip-deleteIcon": {
		color: "grey",
		width: "15px",
	},
}));

const UserChip: React.FC<any> = (props) => {
	const user = props.user;
	const handleOnDrag = props.handleOnDrag;


	const handleClick = () => {
		console.info("You clicked the Chip.");
	};

	const handleDelete = () => { };

	return (
		<CustomChip
			draggable
			onDragStart={(e) => handleOnDrag(e, user)}
			label={user.nickname}
			variant="outlined"
			onClick={handleClick}
			onDelete={handleDelete}
			deleteIcon={<ClearIcon />}
			sx={{ padding: "5px", color: "black" }}
			avatar={<Avatar alt="avatar" src={user.avatar} />}
		/>
	);
};

export default UserChip;
