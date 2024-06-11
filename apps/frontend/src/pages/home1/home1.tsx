import './home1.css';
import DocumentList from '../../components/DocumentList'
import SearchForm from '../../components/SearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

function Home1() {
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

export default Home1
