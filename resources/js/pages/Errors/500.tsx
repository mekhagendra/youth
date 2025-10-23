import React from 'react';
import ErrorPage from './ErrorPage';

const ServerError: React.FC = () => {
    return (
        <ErrorPage
            status={500}
            title="Server Error"
            message="Something went wrong on our end. We're working to fix it!"
        />
    );
};

export default ServerError;