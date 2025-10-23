import React from 'react';
import ErrorPage from './ErrorPage';

const NotFound: React.FC = () => {
    return (
        <ErrorPage
            status={404}
            title="Page Not Found"
            message="The page you're looking for seems to have vanished into thin air!"
        />
    );
};

export default NotFound;