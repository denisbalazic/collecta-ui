import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {userLoginAction} from '../../store/saga/auth/auth.sagaActions';
import Form from '../../components/form/Form';
import Field from '../../components/form/Field';

const Login = () => {
    const dispatch = useDispatch();
    const [authCredentials, setAuthCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (name: string, value: string | number): void => {
        setAuthCredentials({
            ...authCredentials,
            [name]: value,
        });
    };

    const handleSubmit = (): void => {
        dispatch(userLoginAction(authCredentials));
    };

    return (
        <div>
            <p>Login</p>
            <div>
                <Form handleSubmit={handleSubmit}>
                    <Field
                        label="Email"
                        name="email"
                        placeholder="email"
                        value={authCredentials.email}
                        handleChange={handleChange}
                    />
                    <Field
                        label="Password"
                        name="password"
                        placeholder="password"
                        value={authCredentials.password}
                        handleChange={handleChange}
                    />
                </Form>
            </div>
        </div>
    );
};

export default Login;
