import React, {useState} from 'react';

const Register = () => {
    // const dispatch = useDispatch();
    const [authCredentials, setAuthCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
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
            <p>Register</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={authCredentials.name}
                        onChange={handleChange}
                    />
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
                    <input
                        type="text"
                        name="confirmedPassword"
                        placeholder="confirm password"
                        value={authCredentials.confirmedPassword}
                        onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    );
};

export default Register;
