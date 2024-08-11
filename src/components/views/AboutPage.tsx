import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';

const AboutPage = (): ReactElement => {
    return (
        <div>
            <p>About page</p>
            <Link to="/collections">explore collections</Link>
        </div>
    );
};

export default AboutPage;
