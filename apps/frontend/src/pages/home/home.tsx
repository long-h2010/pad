import { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, createTheme, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import { NoteAddOutlined, SortByAlpha, UploadFileOutlined } from '@mui/icons-material';
import PrimarySearchAppBar from '../../components/appbar';
import DocItem from '../../components/doc-item';
import Loading from '../../components/loading';
import MySpeedDial from '../../components/speed-dial';
import './home.css';
import HomeStyles from './style';

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
    const navigateTo = useNavigate();
    const token = localStorage.getItem('token');
    const { doc_url, loading } = useGlobalContext();
    const [documents, setDocuments] = useState([]);
    const { classes } = HomeStyles();

    const fetchDocuments = useCallback(async () => {
        axios
            .get(`${doc_url}/`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                const data = res.data;
                setDocuments(data);
            })
            .catch(err => {
                console.log('Error when fetch documents data: ', err);
            })
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [])

    const createDoc = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(token)
        try {
            axios
                .post(`${doc_url}/create`, { Authorization: `Bearer ${token}` })
                .then(res => {
                    console.log('Create document successful');
                    navigateTo(`/document/${res.data._id}`);
                })
                .catch(err => {
                    console.log('Error when fetch documents data: ', err);
                })
        } catch (error) {
            console.log(error);
        }
    };

    const uploadDoc = () => {

    };

    const actions = [
        { icon: <UploadFileOutlined />, name: 'Import', click: uploadDoc },
        { icon: <NoteAddOutlined />, name: 'Add', click: createDoc },
    ];

    const columnCounts = {
        mobile: 2,
        tablet: 3,
        laptop: 4,
    };

    if (loading) return <Loading />;

    return (
        <main>
            <header>
                <PrimarySearchAppBar />
            </header>
            <Container className={classes.containerHome} >
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
                                <Typography variant='h5'>
                                    Tài liệu gần đây
                                </Typography>
                            </Box>
                            <Box style={{ display: 'flex' }}>
                                <select 
                                    className={classes.selectRule}
                                    aria-label='Default select example'
                                >
                                    <option value='1'>Do tôi sở hữu</option>
                                    <option value='2'>Được chia sẻ với tôi</option>
                                </select>
                                <IconButton>
                                    <SortByAlpha sx={{color: "black"}}/>
                                </IconButton>
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
                                <DocItem key={document.id} {...document} />
                            </Grid>
                        ))}
                    </Grid>
                </ThemeProvider>
            </Container>
            <MySpeedDial actions={actions} />
        </main>
    );
}

export default Home
