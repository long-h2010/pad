import Loading from './loading';
import { useGlobalContext } from '../context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DocItem from './doc-item';
import { SortByAlpha } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';

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

function DocumentList() {
    const { documents, loading } = useGlobalContext();

    if (loading) return <Loading />;

    if (documents.length < 1) return <h2 className='section-title'>No document matched your search</h2>;

    const columnCounts = {
        mobile: 2,
        tablet: 3,
        laptop: 4,
    };

    return (
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

                {documents.map((document) => (
                    <Grid
                        item
                        mobile={12 / columnCounts.mobile}
                        tablet={12 / columnCounts.tablet}
                        laptop={12 / columnCounts.laptop}
                        key={document.id}
                        sx={{ width: '100%', padding: 2 }}
                    >
                        <DocItem key={document.id} {...document} />
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>
    );
}

export default DocumentList
