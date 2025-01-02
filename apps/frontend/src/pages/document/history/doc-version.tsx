import axios from 'axios';
import { useGlobalContext } from '../../../context';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Version from '../../../components/doc/version';
import { Box, Button, Dialog, Divider, Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { fDateTime } from '../../../utils/format-time';
import HtmlDiff from 'htmldiff-js';

const useStyles = makeStyles()(() => {
    return {
        containerHistory: {
            borderRadius: '10px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            height: '100%',
            width: '700px',
        },
        left: {
            flexBasis: '75%',
            overflow: 'auto',
            padding: '15px',
        },
        right: {
            flexBasis: '25%',
            backgroundColor: '#f0f0f0',
        },
    };
});

const DocVersion: React.FC<any> = ({ setContent }) => {
    const { history_url, setAlertInfor, setShowAlert } = useGlobalContext();
    const { id } = useParams();
    const docId = atob(id as string);
    const [versions, setVersions] = useState<any>({});
    const { classes } = useStyles();
    const [selectedItem, setSelectedItem] = useState(0);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const getHistory = () => {
        axios
            .get(`${history_url}/${docId}`)
            .then((res) => setVersions(res.data))
            .catch((err) => console.log('Error when retrieving version data: ', err));
    };

    useEffect(() => {
        getHistory();
    }, []);

    const restoreVersion = (version: number, conent: string) => {
        axios
            .put(`${history_url}/${docId}/restore-version/${version}`)
            .then((res) => {
                getHistory();
                setContent(conent);
                const data = res.data.message;
                setAlertInfor(['success', data]);
                setShowAlert(true);
            })
            .catch((err) => console.log('Error when restoring version: ', err));
    };

    return (
        <Dialog maxWidth='tablet' fullWidth open={open} onClose={handleClose}>
            <style>
                {`
                    .MuiBox-root.css-1hv37es {
                        width: 100%;
                    }

                    del {
                        text-decoration: none;
                        background-color: red;
                        color: white;
                        margin-right: 2px;
                    }

                    ins {
                        text-decoration: none;
                        background-color: green;
                        color: white;
                        margin-right: 2px;
                    }

                    .wrapper {
                        display: flex;
                    }

                    .wrapper div.inner {
                        padding: 15px;
                        width: calc(100% / 3);
                        text-align: center;
                    }

                    .wrapper div.inner div:first-child {
                        padding-bottom: 10px;
                        font-weight: bold;
                        border-bottom: 1px solid;
                    }
                `}
            </style>
            <Box
                sx={{
                    borderRadius: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {fDateTime(versions[selectedItem]?.time)}
                    </Typography>
                    <Stack direction='row' spacing={1}>
                        <Button
                            variant='contained'
                            color='success'
                            onClick={() => {
                                restoreVersion(selectedItem, versions[selectedItem].content);
                                handleClose();
                            }}
                        >
                            Khôi phục phiên bản này
                        </Button>
                        <Button variant='outlined' color='success' onClick={handleClose}>
                            Đóng
                        </Button>
                    </Stack>
                </Box>
                <Divider></Divider>
                <Box sx={{ display: 'flex', height: 'calc(100vh - 150px)', overflow: 'hidden' }}>
                    <Box className={classes.left}>
                        <div
                            style={{ padding: 5 }}
                            dangerouslySetInnerHTML={{
                                __html:
                                    selectedItem > 0
                                        ? HtmlDiff.execute(
                                              versions[selectedItem]?.content,
                                              versions[selectedItem - 1]?.content
                                          )
                                        : versions[selectedItem]?.content,
                            }}
                        />
                    </Box>
                    <Box className={classes.right}>
                        <Box sx={{ backgroundColor: '#fff' }}>
                            <Typography variant='h6' sx={{ padding: '10px' }}>
                                Lịch sử sửa đổi
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                maxHeight: 'calc(100vh - 200px)',
                                padding: 1,
                            }}
                        >
                            <Stack spacing={2} p={2}>
                                {versions.length >= 0 ? (
                                    <Version
                                        {...{
                                            versions,
                                            restoreVersion,
                                            selectedItem,
                                            setSelectedItem,
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

export default DocVersion;
