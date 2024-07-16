import { Box, Divider, Typography } from '@mui/material';
import { UserOffline, UserOnline } from '../../../components/user-item';

function ListUser(data: any) {
    const owners = data.owners;
    const writers = data.writers;
    const readers = data.readers;

    return (
        <>
            <Typography variant='h6'>Người sở hữu</Typography>
            <Box>
                {Object.keys(owners).length !== 0 ? (
                    owners.map((user: any, index: number) => {
                        { return user ? <UserOnline key={index} {...{ name: user.name, avatar: '/static/images/avatar/1.jpg' }} /> : <></> }
                    })
                ) : (
                    <></>
                )}
            </Box>
            <Typography variant='h6'>Người chỉnh sửa</Typography>
            <Box>
                {Object.keys(writers).length !== 0 ? (
                    writers.map((user: any, index: number) => {
                        { return user ? <UserOnline key={index} {...{ name: user.name, avatar: '/static/images/avatar/1.jpg' }} /> : <></> }
                    })
                ) : (
                    <></>
                )}
            </Box>
            <Divider />
            <Typography variant='h6'>Người xem</Typography>
            <Box>
                {Object.keys(readers).length !== 0 ? (
                    readers.map((user: any, index: number) => {
                        { return user ? <UserOnline key={index} {...{ name: user.name, avatar: '/static/images/avatar/1.jpg' }} /> : <></> }
                    })
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
}

export default ListUser