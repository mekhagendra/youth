import React from 'react';
import ErrorPage from './ErrorPage';

const Forbidden: React.FC = () => {
    return (
        <ErrorPage
            status={403}
            title="Access Forbidden"
            message="You don't have permission to access this area."
        />
    );
};

export default Forbidden;