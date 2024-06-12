import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFolder } from '@fortawesome/free-solid-svg-icons';
import SearchForm from '../../components/SearchForm';
import DocumentList from '../../components/DocumentList';
import './home.css';

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
    }, []);

    const renderDocuments = documents.map(doc => {
        return (
            <li key={doc._id}>
                <a href={`/document/${doc._id}`}>{doc.name}</a>
            </li>
        );
    })

    return (
        <>
            <header id='docs-header'>
                <div>
                    <FontAwesomeIcon icon={faBars} className='docs__sidebar'/>
                    <img src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" alt="Icon" className='docs__icon'/>
                    <h3 className='docs__head'>Tài liệu</h3>
                </div>
                <SearchForm />
                <div className='avatar'><img src='https://th.bing.com/th/id/OIP.7viG7KziuuP9ceZIvtnQawHaJ0?rs=1&pid=ImgDetMain' alt='Avatar' className='avatar__user'/></div>
            </header>
            <div id='docs-content'>
                <div className='content-header'>
                    <div>
                        <h5 className='content-title'>Tài liệu gần đây</h5>
                    </div>
                    <div>
                        <select className="form-select" style={{width: "80%", display: "inline"}} aria-label="Default select example">
                            <option value="1">Do tôi sở hữu</option>
                            <option value="2">Do mọi người sở hữu</option>
                        </select>
                        <FontAwesomeIcon icon={faFolder} className='docs__folder'/>
                    </div>
                </div>
                <div className='content-body'>
                    <DocumentList />
                </div>
            </div>
        </>
    )
}

export default Home
