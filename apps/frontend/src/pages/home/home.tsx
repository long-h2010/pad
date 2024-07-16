import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Edit, NoteAddOutlined, UploadFileOutlined } from '@mui/icons-material';
import PrimarySearchAppBar from '../../components/appbar';
import DocumentList from '../../components/doc-list';
import './home.css';


function OpenIconSpeedDial() {
    const navigateTo = useNavigate();
    const token = localStorage.getItem('token');
    const doc_url = import.meta.env.VITE_APP_DOCUMENTS_URL;

    const uploadDoc = () => {

    };

    const createDoc = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(token)
        try {
            axios
                .post(doc_url + 'create', { Authorization: `Bearer ${token}` })
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

    const actions = [
        { icon: <UploadFileOutlined />, name: 'Import', click: uploadDoc },
        { icon: <NoteAddOutlined />, name: 'Add', click: createDoc },
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                transform: 'translateZ(0px)',
                flexGrow: 1,
            }}
        >
            <SpeedDial
                ariaLabel='SpeedDial openIcon example'
                icon={<SpeedDialIcon sx={{ color: 'black' }} openIcon={<Edit />} />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        sx={{ backgroundColor: 'white', color: 'black' }}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.click}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

function Home() {
    return (
        <main>
            <header>
                <PrimarySearchAppBar />
            </header>
            <div id='docs-content'>
                <DocumentList />
            </div>
            <OpenIconSpeedDial />
        </main>
    );
}

export default Home
