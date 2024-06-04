import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

function Home() {
    const token = localStorage.getItem('token');
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_DOCUMENTS_URL, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDocuments(res.data);
            })
            .catch(err => {
                console.log('Error when retrieving document data: ', err);
            })
    });

    const renderDocuments = documents.map(doc => {
        return (
            <li key={doc._id}>
                <a href={`/document/${doc._id}`}>{doc.name}</a>
            </li>
        );
    })

    return (
        <ul>
            {token? renderDocuments : 'Hello'}
        </ul>
    )
}

export default Home
