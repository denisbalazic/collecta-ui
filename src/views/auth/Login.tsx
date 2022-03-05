import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {userLoginAction} from '../../store/saga/auth/auth.sagaActions';

const Login = () => {
    const dispatch = useDispatch();
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
        dispatch(userLoginAction(authCredentials));
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
