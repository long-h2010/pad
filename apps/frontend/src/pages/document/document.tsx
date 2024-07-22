import { useCallback, useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../context';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import { Input } from '@mui/joy';
import { Button } from '@mui/material';
import { Groups, History } from '@mui/icons-material';
import { Editor } from '@tinymce/tinymce-react';
import './document.css';
import Dashboard from '../../components/dashboard';
import UsersGroup from './group/group-dashboard';
import RightDrawer from '../../components/right-drawer';
import Chat from './chat/chat';

function Document() {
    const docId = useParams().id;
    const { doc_url } = useGlobalContext();
    const socket = io('http://localhost:3000');
    const editorRef = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        axios
            .get(`${doc_url}/${docId}`)
            .then((res) => {
                setContent(res.data.content);
            })
            .catch((err) => {
                console.log('Error when retrieving documents data: ', err);
            })
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected');
        });

        socket.on('updateText', (data) => {
            setContent(data);
            updateDoc(data);
        });

        return () => {
            socket.off('connect');
            socket.off('updateText');
        };
    }, []);

    const updateDoc = useCallback(debounce((text) => {
        axios
            .put(`${doc_url}/${docId}`, { content: text })
            .then((res) => {
                console.log(res);
                setContent(text);
            })
            .catch((err) => {
                console.log('Error when update documents data: ', err);
            })
    }, 1200), []);

    const handleEditText = debounce((html: string) => {
        setContent(html);
        socket.emit('edit', { content: html });
    }, 0);

    return (
        <div id='container'>
            <div id='docs-header'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input
                        name='input-doc-title'
                        variant='outlined'
                        color='success'
                        sx={{
                            width: '30%',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}
                    />
                    <div style={{ display: 'flex' }}>
                        <Button>
                            <History />
                        </Button>
                        <Dashboard {...{ iconButton: <Groups />, element: <UsersGroup /> }} />
                        <RightDrawer {...{ element: <Chat /> }} />
                    </div>
                </div>
            </div>
            <Editor
                apiKey='tok1lhzg5h155ewt8cpsahu9pcvc5sh95ufqmjluksnky6ot'
                onInit={(_evt, editor: any) => editorRef.current = editor}
                init={{
                    plugins:
                        'fullscreen save pagebreak anchor preview autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                    toolbar:
                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags pagebreak | spellcheckdialog typography | alignleft aligncenter alignright alignjustify lineheight | checklist numlist bullist indent outdent | emoticons charmap | fullscreen removeformat preview save',
                    menubar: 'favs file edit view insert format tools table help',
                    fullscreen_native: true,
                }}
                onEditorChange={handleEditText}
                value={content}
            />
        </div>
    );
}

export default Document;
