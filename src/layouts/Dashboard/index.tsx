import React from 'react';
import { Container } from 'react-bootstrap';
import Header from 'components/Header';
import { history } from 'App';
const Dashboard = (Content: React.FC<any>) => {
    return (props: any) => {
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
