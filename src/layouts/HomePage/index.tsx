import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'components/Header';
import Welcome from 'components/Welcome';
import { layoutProps } from 'layouts/types';

const HomePage = (Content: React.FC<layoutProps>) => {
    return (props: layoutProps) => {
        const { history } = props;
        return (
            <>
                <Header history={history} />
                <Container>
                    <Row>
                        <Col md='8'>
                            <Welcome />
                        </Col>
                        <Col md='4'>
                            <Content {...props} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
};

export default HomePage;
