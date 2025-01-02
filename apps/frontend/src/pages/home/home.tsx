import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mammoth from 'mammoth';
import { Box, createTheme, Grid, IconButton, Menu, MenuItem, ThemeProvider, Typography } from '@mui/material';
import { NoteAddOutlined, SortByAlpha, UploadFileOutlined } from '@mui/icons-material';
import PrimarySearchAppBar from '../../components/sections/appbar';
import DocItem from '../../components/doc/doc-item';
import Loading from '../../components/sections/loading';
import MySpeedDial from '../../components/sections/speed-dial';
import HomeStyles from '../../assets/styles/home';
import { debounce } from 'lodash';
import LazyLoad from 'react-lazyload';
import requestApi from '../../hooks/useApi';

declare module '@mui/system' {
    interface BreakpointOverrides {
        laptop: true;
        tablet: true;
        mobile: true;
        desktop: true;

        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
    }
}

function Home() {
    const { classes } = HomeStyles();
    const navigateTo = useNavigate();
    const token = localStorage.getItem('token');
    const { doc_url, loading, setAlertInfor, setShowAlert } = useGlobalContext();
    const [documents, setDocuments] = useState([]);
    const [option, setOption] = useState('all');
    const [flag, setFlag] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const columnCounts = {
        mobile: 2,
        tablet: 3,
        laptop: 4,
    };

    if (loading) return <Loading />;

    const fetchAllDocuments = useCallback(async () => {
        requestApi(`${doc_url}/all`, 'get')
            .then(res => {
                const data = res.data;
                setDocuments(data);
            })
            .catch(err => {
                console.log('Error when fetch documents data: ', err);
            })
    }, []);

    const fetchDocumentsOwner = useCallback(async () => {
        requestApi(`${doc_url}/owner`, 'get')
            .then(res => {
                const data = res.data;
                setDocuments(data);
            })
            .catch(err => {
                console.log('Error when fetch documents data: ', err);
            })
    }, []);

    const fetchDocumentsShared = useCallback(async () => {
        requestApi(`${doc_url}/shared`, 'get')
            .then(res => {
                const data = res.data;
                setDocuments(data);
            })
            .catch(err => {
                console.log('Error when fetch documents data: ', err);
            })
    }, []);

    const handleSearch = useCallback(debounce((option: string, value: string) => {
        requestApi(`${doc_url}/search/${option}/${value}`, 'get')
            .then((res) => {
                setDocuments(res.data);
            })
            .catch((err) => console.log('Error when update document\'s name: ', err))
    }, 1200), []);

    const handleUpdateDocName = useCallback((docId: string, newName: string) => {
        requestApi(`${doc_url}/${docId}`, 'put', { name: newName })
            .then((res) => {
                setFlag(true);
                const data = res.data.message;
                setAlertInfor(['success', data]);
                setShowAlert(true);
            })
            .catch((err) => console.log('Error when update document\'s name: ', err))
    }, []);

    const handleDeleteDoc = useCallback((docId: string) => {
        requestApi(`${doc_url}/${docId}`, 'delete')
            .then((res) => {
                setFlag(true);
                const data = res.data.message;
                setAlertInfor(['success', data]);
                setShowAlert(true);
            })
            .catch((err) => {
                const data = err.response.data.message;
                setAlertInfor(['error', data]);
                setShowAlert(true);
            })
    }, []);

    const handleUpdateTags = useCallback((docId: string, tags: string) => {
        requestApi(`${doc_url}/${docId}`, 'put', { data: { tags: tags } })
            .then((res) => {
                setFlag(true);
                const data = res.data.message;
                setAlertInfor(['success', data]);
                setShowAlert(true);
            })
            .catch((err) => console.log('Error when update tag for document: ', err))
    }, []);

    const createDoc = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            requestApi(`${doc_url}/create`, 'post', [])
                .then(res => {
                    console.log('Create document successful');
                    const docId = btoa(res.data._id);
                    navigateTo(`/document/${docId}`);
                })
                .catch(err => {
                    console.log('Error when fetch documents data: ', err);
                })
        } catch (error) {
            console.log(error);
        }
    }, []);

    const uploadDoc = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file)

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e: any) => {
                const arrayBuffer: ArrayBuffer = e.target.result;

                if (arrayBuffer)
                    mammoth
                        .convertToHtml({ arrayBuffer })
                        .then((result) => {
                            axios
                                .post(`${doc_url}/create`, {
                                    Authorization: `Bearer ${token}`,
                                    data: {
                                        name: file.name.slice(0, file.name.lastIndexOf('.')),
                                        content: result.value
                                    }
                                })
                                .then(() => {
                                    setFlag(true);
                                    setAlertInfor(['success', 'Upload document successful']);
                                    setShowAlert(true);
                                    fetchAllDocuments();
                                })
                                .catch(() => {
                                    setAlertInfor(['error', 'Upload document failed']);
                                    setShowAlert(true);
                                })
                        })
                        .catch((err) => {
                            console.error(err);
                        });
            }

            reader.readAsArrayBuffer(file)
        }
    },[]);

    useEffect(() => {
        if (!searchValue) {
            if (option === 'all') fetchAllDocuments();
            else if (option === 'owner') fetchDocumentsOwner();
            else fetchDocumentsShared();
        } else { 
            handleSearch(option, searchValue);
        }

        return () => setFlag(false);
    }, [option, flag, searchValue]);

    const actions = [
        {
            icon:
                <>
                    <input id='upload-doc' type='file' style={{ display: 'none' }} accept='.docx .doc' onChange={uploadDoc} />
                    <label htmlFor='upload-doc'><UploadFileOutlined /></label>
                </>,
            name: 'Import',
            click: () => document.getElementById('uplaoad-doc')?.click()
        },
        { icon: <NoteAddOutlined />, name: 'Add', click: createDoc },
    ];

    const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    const handleSortTitles = () => {
        handleCloseSort()
        documents.sort((a: any, b: any) => a.name.localeCompare(b.name));
    };

    const handleSortDates = () => {
        handleCloseSort()
        documents.sort((a: any, b: any) =>
            b.updatedAt.localeCompare(a.updatedAt)
        );
    };

    return (
        <main style={{minHeight: "800px", backgroundColor: "rgb(243, 243, 243)"}}>
            <header>
                <PrimarySearchAppBar {...{ setSearchValue }} />
            </header>
            <Box className={classes.containerHome}>
                <ThemeProvider
                    theme={createTheme({
                        breakpoints: {
                            values: {
                                laptop: 1024,
                                tablet: 640,
                                mobile: 0,
                                desktop: 1280,
                            },
                        },
                    })}
                >
                    <Grid
                        container
                        spacing={{ mobile: 1, tablet: 1, laptop: 2, desktop: 3 }}
                        columns={12}
                        className={classes.gridContainer}
                    >
                        <Box className={classes.contentHeader}>
                            <Box>
                                <Typography variant='h5'>Tài liệu gần đây</Typography>
                            </Box>
                            <Box style={{ display: 'flex' }}>
                                <select
                                    className={classes.selectType}
                                    aria-label='Default select example'
                                    onChange={(e) => setOption(e.target.value)}
                                >
                                    <option value='all'>Tất cả</option>
                                    <option value='owner'>Do tôi sở hữu</option>
                                    <option value='shared'>Được chia sẻ với tôi</option>
                                </select>
                                <IconButton onClick={handleClickSort}>
                                    <SortByAlpha sx={{ color: 'black' }} />
                                </IconButton>
                                <Menu
                                    id='basic-menu'
                                    anchorEl={anchorEl}
                                    open={open}
                                    disableScrollLock={true}
                                    onClose={handleCloseSort}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleSortTitles}>Tiêu đề</MenuItem>
                                    <MenuItem onClick={handleSortDates}>
                                        Sửa đổi gần đây nhất
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                        {documents.map((document: any) => (
                            <Grid
                                item
                                mobile={12 / columnCounts.mobile}
                                tablet={12 / columnCounts.tablet}
                                laptop={12 / columnCounts.laptop}
                                key={document._id}
                                sx={{ width: '100%', padding: 2 }}
                            >
                                <LazyLoad key={document._id} height={100}>
                                    <DocItem key={document._id} {...{ document, handleUpdateDocName, handleUpdateTags, handleDeleteDoc }} />
                                </LazyLoad>
                            </Grid>
                        ))}
                    </Grid>
                </ThemeProvider>
            </Box>
            <MySpeedDial actions={actions} />
        </main>
    );
}

export default Home
