import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {userRegisterAction} from '../../store/saga/auth/auth.sagaActions';

const Register = () => {
    const dispatch = useDispatch();
    const [registerUser, setRegisterUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    });

    const handleChange = (e: any) => {
        setRegisterUser({
            ...registerUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(userRegisterAction(registerUser));
    };

    return (
        <div>
            <p>Register</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={registerUser.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={registerUser.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={registerUser.password}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="confirmedPassword"
                        placeholder="confirm password"
                        value={registerUser.confirmedPassword}
                        onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
