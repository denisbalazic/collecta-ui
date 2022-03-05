import React, {useState} from 'react';
// import {useDispatch} from 'react-redux';

const Login = () => {
    // const dispatch = useDispatch();
    const [authCredentials, setAuthCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: any) => {
        setAuthCredentials({
            ...authCredentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // dispatch()
    };

    return (
        <div>
            <p>Login</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={authCredentials.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={authCredentials.password}
                        onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
