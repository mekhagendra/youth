import React from 'react';
import ErrorPage from './ErrorPage';

const ServiceUnavailable: React.FC = () => {
    return (
        <ErrorPage
            status={503}
            title="Service Unavailable"
            message="We're currently performing maintenance. Please check back in a few minutes!"
        />
    );
};

export default ServiceUnavailable;