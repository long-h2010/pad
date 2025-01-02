import { Done } from '@mui/icons-material';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { fDateTime } from '../../utils/format-time';

const VersionItem: React.FC<any> = ({ version, index, selectedItem, setSelectedItem }) => {
    return (
        <Box
            key={version.id}
            sx={{
                borderRadius: '5px',
                padding: '10px',
                cursor: 'pointer',
                overflow: 'auto',
                backgroundColor: selectedItem === index ? '#ddf5d7' : '#fff',
            }}
            onClick={() => {
                setSelectedItem(index);
            }}
        >
            <Typography variant='subtitle1'>{fDateTime(version.time)}</Typography>
            {index === 0 ? (
                <Typography
                    variant='body2'
                    sx={{ fontStyle: 'italic', fontSize: '12px', padding: '0 0 4px 0' }}
                >
                    Phiên bản hiện tại
                </Typography>
            ) : (
                ''
            )}
            {version.editors.map((editor: any, editorIndex: number) => (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '5px',
                    }}
                >
                    <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
                        <Avatar sx={{ width: 24, height: 24 }} />
                        <Typography variant='caption'>{editor.name}</Typography>
                    </Stack>

                    {selectedItem === index && editorIndex === version.editors.length - 1 ? <Done /> : ''}
                </Box>
            ))}
        </Box>
    );
};

const Version: React.FC<any> = (props) => {
    const { versions, selectedItem, setSelectedItem } = props;

    return (
        <>
            {versions.map((version: any, index: number) => {
                return (
                    <VersionItem
                        key={index}
                        {...{ version, index, selectedItem, setSelectedItem }}
                    />
                );
            })}
        </>
    );
};

export default Version;
