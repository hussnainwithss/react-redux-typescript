import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { ProfileLink, ProfileImage } from 'components/ProfileCard/style';
import user from 'assets/img/user.png';
import { AppRoutes } from 'routes';
import { Props } from 'components/ProfileCard/types';

const ProfileCard: React.FC<Props> = (props: Props) => {
    const { id, picture, name, hometown, age, gender, extras } = props;
    return (
        <Card className='mb-2'>
            <Card.Body>
                <ProfileLink to={AppRoutes.PROFILE.path.replace(':userId', id)}>
                    <Row>
                        <Col className='col-auto'>
                            <ProfileImage
                                src={picture || user}
                                className='rounded-circle'
                            />
                        </Col>
                        <Col>
                            <Row>
                                {name}
                                {hometown ? `, ${hometown}` : ''}
                            </Row>
                            <Row>{`${gender}, ${age}`}</Row>
                            <Row>{extras}</Row>
                        </Col>
                    </Row>
                </ProfileLink>
            </Card.Body>
        </Card>
    );
};

export default ProfileCard;
