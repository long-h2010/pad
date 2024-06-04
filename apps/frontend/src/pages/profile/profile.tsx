import axios from 'axios';

function Profile() {
    const token = localStorage.getItem('token');
    console.log(token)
    axios.get(import.meta.env.VITE_APP_PROFILE_URL, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            console.log(res)
        })

    return (<></>);
}

export default Profile