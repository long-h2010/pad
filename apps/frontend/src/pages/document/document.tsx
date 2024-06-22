import { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import MyEditor from './editor/editor';

function Document() {
    const docId = useParams().id;
    const be_url = import.meta.env.VITE_APP_DOCUMENTS_URL;
    const socket = io('http://localhost:3000');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get(be_url + docId)
            .then(res => {
                setContent(res.data.content);
            })
            .catch(err => {
                console.log('Error when retrieving documents data: ', err);
            })

        socket.on('connect', () => {
            console.log('Connected');
        });

        socket.on('updateText', data => {
            setContent(data)
            updateDoc(data);
        });

        return () => {
            socket.off('connect');
            socket.off('updateText');
        };
    }, []);

    const updateDoc = useCallback(debounce(text => {
        axios.put(be_url + docId, { content: text })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log('Error when update documents data: ', err);
            })
    }, 1500), []);

    const handleEditText = async (html: string) => {
        socket.emit('edit', { content: html });
    };

    return (
        <div id='container'>
            <MyEditor content={content} handleEditText={handleEditText} />
        </div>
    );
}

export default Document