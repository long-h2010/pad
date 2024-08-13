import { Avatar, Chip, styled } from '@mui/material';
import { Clear } from '@mui/icons-material';

const CustomChip = styled(Chip)(() => ({
	'& .MuiChip-deleteIcon': {
		color: 'grey',
		width: '15px',
	},
}));

const UserChip: React.FC<any> = (props) => {
	const { user, handleOnDrag, onDelete } = props;


	const handleClick = (e: any) => {
		console.log(e);
	};

	const handleDelete = (nickname: string) => {
		onDelete(nickname)
	};

	return (
		<CustomChip
			draggable
			onDragStart={(e) => handleOnDrag(e, user)}
			label={user.nickname}
			variant='outlined'
			onClick={handleClick}
			onDelete={() => handleDelete(user.nickname)}
			deleteIcon={<Clear />}
			sx={{ padding: '5px', color: 'black' }}
			avatar={<Avatar alt='avatar' src={user.avatar} />}
		/>
	);
};

export default UserChip
