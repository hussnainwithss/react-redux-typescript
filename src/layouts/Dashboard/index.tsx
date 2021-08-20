import React from 'react';
import { Container } from 'react-bootstrap';
import Header from 'components/Header';
import { history } from 'App';
import { layoutProps } from 'layouts/types';

const Dashboard = (Content: React.FC<layoutProps>) => {
    return (props: layoutProps) => {
        return (
            <>
                <Header history={history} />
                <Container fluid className='p-0'>
                    <Content {...props} />
                </Container>
            </>
        );
    };
};

export default Dashboard;
