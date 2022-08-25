import './login.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import getcookie from '../../utils/getcookie';


export default function Login() {
    const navigate = useNavigate();
    // Idk why I used states here, I like states :D
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Checks this first to see if this page should be loaded or should be redirected elsewhere
    const [canLoad, setCanLoad] = useState(false);

    // Submit form for logging in
    function submit() {
        fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username.toString(),
                'password': password.toString()
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                // If the login was successful, redirect to the profile page
                if (data['msg'] === 'success') {
                    navigate('../profile');
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
            // If the user is not logged in, the page loads like normal
            if (!response.ok) {
                setCanLoad(true);
            // If the user is logged in, redirects to the profile page
            } else {
                navigate('../profile')
            }
        })
    }, []);
    // This is here to prevent the page from loading when someone is signed in and the login page is manually
    // navigated to
    if (canLoad) {
        return (
            <div className="loginPrompt">
                <input type="text" placeholder="Username" onChange={(event) => {
                    setUsername(event.target.value);
                }}/>
                <br/>
                <input type="password" placeholder="Password" onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
                <br/>
                <button onClick={() => {
                    submit();
                }}>Login
                </button>
            </div>
        )
    }
}
