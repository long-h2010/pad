import { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, Grid, IconButton, ThemeProvider } from '@mui/material';
import { NoteAddOutlined, SortByAlpha, UploadFileOutlined } from '@mui/icons-material';
import PrimarySearchAppBar from '../../components/appbar';
import DocItem from '../../components/doc-item';
import Loading from '../../components/loading';
import MySpeedDial from '../../components/speed-dial';
import './home.css';

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
            <div id='docs-content'>
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
                        className='grid-container'
                    >
                        <div className='content-header'>
                            <div>
                                <h5 className='content-title' style={{ fontWeight: 500 }}>
                                    Tài liệu gần đây
                                </h5>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <select
                                    className='form-select'
                                    style={{ display: 'inline', color: 'black' }}
                                    aria-label='Default select example'
                                >
                                    <option value='1'>Do tôi sở hữu</option>
                                    <option value='2'>Do mọi người sở hữu</option>
                                </select>
                                <IconButton>
                                    <SortByAlpha />
                                </IconButton>
                            </div>
                        </div>

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
            </div>
            <MySpeedDial actions={actions} />
        </main>
    );
}

export default Home
