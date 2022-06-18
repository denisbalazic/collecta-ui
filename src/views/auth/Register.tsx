import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {userRegisterAction} from '../../store/saga/auth/auth.sagaActions';
import Form from '../../components/form/Form';
import Field from '../../components/form/Field';

const Register = () => {
    const dispatch = useDispatch();
    const [registerUser, setRegisterUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    });

    const handleChange = (name: string, value: string | number): void => {
        setRegisterUser({
            ...registerUser,
            [name]: value,
        });
    };

    const handleSubmit = (): void => {
        dispatch(userRegisterAction(registerUser));
    };

    return (
        <div>
            <p>Register</p>
            <div>
                <Form handleSubmit={handleSubmit}>
                    <Field
                        label="Name"
                        name="name"
                        placeholder="name"
                        value={registerUser.name}
                        handleChange={handleChange}
                    />
                    <Field
                        label="Email"
                        name="email"
                        placeholder="email"
                        value={registerUser.email}
                        handleChange={handleChange}
                    />
                    <Field
                        label="Password"
                        name="password"
                        placeholder="password"
                        value={registerUser.password}
                        handleChange={handleChange}
                    />
                    <Field
                        label="Confirm password"
                        name="confirmedPassword"
                        placeholder="confirm password"
                        value={registerUser.confirmedPassword}
                        handleChange={handleChange}
                    />
                </Form>
            </div>
        </div>
    );
};

export default Register;
