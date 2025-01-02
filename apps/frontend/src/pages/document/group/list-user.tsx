import { Box, Typography } from '@mui/material';
import { UserOffline, UserOnline } from '../../../components/user/user-item';
import GroupStyles from '../../../assets/styles/group';
import { useGlobalContext } from '../../../context';

const Users: React.FC<any> = ({users}) => {
    const { usersOnline } = useGlobalContext();
    
    return Object.keys(users).length !== 0 ? (
        users.map((user: any, index: number) => {
            return user ? (
                (usersOnline as any).includes(user.id) ? (
                    <UserOnline
                        key={index}
                        {...{
                            avatar: user.avatar,
                            name: user.name,
                            nickname: user.nickname,
                        }}
                    />
                ) : (
                    <UserOffline
                        key={index}
                        {...{
                            avatar: user.avatar,
                            name: user.name,
                            nickname: user.nickname,
                        }}
                    />
                )
            ) : (
                <></>
            );
        })
    ) : (
        <></>
    );
};

const ListUser: React.FC<any> = (props) => {
    const { classes } = GroupStyles();
    const { owner, writers, readers } = props;

    return (
        <Box>
            <Typography variant='h6' className={classes.titleRule}>
                Người sở hữu
            </Typography>
            <Box
                className={classes.boxRule}
                sx={{ display: 'block !important' }}
            >
                <Users users={[owner]} />
            </Box>
            <Typography variant='h6' className={classes.titleRule}>
                Người chỉnh sửa
            </Typography>
            <Box
                className={classes.boxRule}
                sx={{ display: 'block !important' }}
            >
                <Users users={writers} />
            </Box>
            <Typography variant='h6' className={classes.titleRule}>
                Người xem
            </Typography>
            <Box
                className={classes.boxRule}
                sx={{ display: 'block !important' }}
            >
                <Users users={readers} />
            </Box>
        </Box>
    );
};

export default ListUser
