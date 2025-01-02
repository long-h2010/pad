import { Button, Container } from '@mui/material';
import NotFoundImage from '../../assets/background/404.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function NotFound() {
    return (
        <Container sx={{ justifyContent: 'center', textAlign: 'center' }}>
            <img src={NotFoundImage} style={{maxHeight: '50vh', marginTop: '10vh'}}/>
            <h1 className='text-primary mt-5'>
                PAGE <span className='fw-bolder'>NOT FOUND</span>
            </h1>
            <p className='my-4'>
                Oops! Looks like you followed a bad link. 
                If you think this is a problem with us, contact us.
            </p>
            <Button href='/' variant='outlined'>
                <FontAwesomeIcon icon={faChevronLeft} className='me-2' beatFade />
                Go back home
            </Button>
        </Container>
    );
}

export default NotFound