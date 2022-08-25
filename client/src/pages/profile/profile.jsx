import './profile.css';
import {useNavigate} from "react-router";
import getcookie from '../../utils/getcookie';
import {useEffect, useState} from "react";

export default function Profile() {
    const navigate = useNavigate();
    // Checks this first to see if this page should be loaded or should be redirected elsewhere
    const [canLoad, setCanLoad] = useState(false);

    function logout() {
        fetch('/api/logout/', {
            method: 'POST',
            headers: {
                'creditentials': 'same-origin',
                'X-CSRFToken': getcookie('csrftoken')
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data['msg'] === 'success') {
                    navigate('../login');
                }
            })
    }

    // Runs when the page is loaded / states are updated
    useEffect(() => {
        fetch('/api/isauth/', {
            method: 'POST',
            headers: {
                'creditentials': 'same-origin',
                'X-CSRFToken': getcookie('csrftoken')
            }
        }).then(response => {
            // If the user is not logged in, redirects to the login page
            if (!response.ok) {
                navigate('../login')
                // If the user is logged in, the page loads like normal
            } else {
                setCanLoad(true);
            }
        })
    }, []);
    // This is here to prevent the page from loading when someone is not signed in and the profile page is manually
    // navigated to
    if (canLoad) {
        return (
            <div>
                <span>Profile</span>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }
}
