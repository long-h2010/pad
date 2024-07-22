import { Box, Typography } from '@mui/material';
import { UserOffline, UserOnline } from '../../../components/user-item';
import GroupStyles from './style';

const ListUser: React.FC<any> = (props) => {
    const { classes } = GroupStyles();
    const { owners, writers, readers } = props;

    return (
        <Box>
            <Typography variant='h6' className={classes.titleRule}>
                Người sở hữu
            </Typography>
            <Box className={classes.boxRule} sx={{ display: 'block !important' }}>
                {Object.keys(owners).length !== 0 ? (
                    owners.map((user: any, index: number) => {
                        {
                            return user ? (
                                <UserOnline
                                    key={index}
                                    {...{
                                        avatar: user.avatar,
                                        name: user.name,
                                        nickname: user.nickname,
                                    }}
                                />
                            ) : (
                                <></>
                            );
                        }
                    })
                ) : (
                    <></>
                )}
            </Box>
            <Typography variant='h6' className={classes.titleRule}>
                Người chỉnh sửa
            </Typography>
            <Box className={classes.boxRule} sx={{ display: 'block !important' }}>
                {Object.keys(writers).length !== 0 ? (
                    writers.map((user: any, index: number) => {
                        {
                            return user ? (
                                <UserOnline
                                    key={index}
                                    {...{
                                        avatar: user.avatar,
                                        name: user.name,
                                        nickname: user.nickname,
                                    }}
                                />
                            ) : (
                                <></>
                            );
                        }
                    })
                ) : (
                    <></>
                )}
            </Box>
            <Typography variant='h6' className={classes.titleRule}>
                Người xem
            </Typography>
            <Box className={classes.boxRule} sx={{ display: 'block !important' }}>
                {Object.keys(readers).length !== 0 ? (
                    readers.map((user: any, index: number) => {
                        {
                            return user ? (
                                <UserOffline
                                    key={index}
                                    {...{
                                        avatar: user.avatar,
                                        name: user.name,
                                        nickname: user.nickname,
                                    }}
                                />
                            ) : (
                                <></>
                            );
                        }
                    })
                ) : (
                    <></>
                )}
            </Box>
        </Box>
    );
}

export default ListUser