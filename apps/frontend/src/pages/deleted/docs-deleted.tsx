import { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import axios from 'axios';
import { Box, createTheme, Grid, IconButton, Menu, MenuItem, ThemeProvider, Typography } from '@mui/material';
import { SortByAlpha } from '@mui/icons-material';
import PrimarySearchAppBar from '../../components/sections/appbar';
import DocItem from '../../components/doc/doc-item';
import HomeStyles from '../../assets/styles/home';
import LazyLoad from 'react-lazyload';

function Deleted() {
    const { classes } = HomeStyles();
    const token = localStorage.getItem('token');
    const { doc_url, setAlertInfor, setShowAlert } = useGlobalContext();
    const [documents, setDocuments] = useState([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const columnCounts = {
        mobile: 2,
        tablet: 3,
        laptop: 4,
    };
    
    const fetchAllDocumentsDeleted = useCallback(async () => {
        axios
            .get(`${doc_url}/deleted`, { headers: { authorization: `Bearer ${token}` } })
            .then(res => {
                const data = res.data;
                setDocuments(data);
            })
            .catch(err => {
                console.log('Error when fetch documents data: ', err);
            })
    }, []);

    useEffect(() => {
        fetchAllDocumentsDeleted();
    }, [documents]);

    const restoreDocument = (docId: string) => {
        axios
            .put(`${doc_url}/restore/${docId}`, { Authorization: `Bearer ${token}` })
            .then(res => {
                const data = res.data.message;
                setAlertInfor(['success', data]);
                setShowAlert(true);
                fetchAllDocumentsDeleted()
            })
            .catch(err => {
                console.log('Error when fetch documents data: ', err);
            })
    };

    const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    const handleSortTitles = () => {
        handleCloseSort();
        documents.sort((a: any, b: any) => a.name.localeCompare(b.name));
    };

    const handleSortDates = () => {
        handleCloseSort();
        documents.sort((a: any, b: any) => b.updatedAt.localeCompare(a.updatedAt));
    };

    return (
        <main>
            <header>
                <PrimarySearchAppBar {...{ }} />
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
                                <Typography variant='h5'>Tài liệu đã xóa</Typography>
                            </Box>
                            <Box style={{ display: 'flex' }}>
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
                                    <DocItem key={document._id} {...{ document, isDeleted: true, restoreDocument }} />
                                </LazyLoad>
                            </Grid>
                        ))}
                    </Grid>
                </ThemeProvider>
            </Box>
        </main>
    );
}

export default Deleted
