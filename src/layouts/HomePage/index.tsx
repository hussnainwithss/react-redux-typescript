import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'components/Header';
import Welcome from 'components/Welcome';

const HomePage = (Content: React.FC<any>) => {
    return (props: any) => {
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
