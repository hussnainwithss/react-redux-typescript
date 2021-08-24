import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';
import { AxiosError, AxiosResponse } from 'axios';
import ErrorBoundary from 'components/ErrorBoundary';
import { fetchUserInfoAction } from 'pages/Auth/ducks/actions';
import { fetchUserPostsAction } from 'pages/Profile/ducks/actions';
import ProfileImagesSection from 'components/ProfileImagesSection';
import ProfileContainer from 'elements/Profile/ProfileContainer';
import UserInfoAccordian from 'components/UserInfoAccordian';
import Posts from 'components/Posts';
import { getUserInfo, getUserPosts } from 'api';
import CreatePostPrompt from 'components/CreatePostPrompt';
import { User } from 'components/ProfileImagesSection/types';
import { RootState } from 'store';
import { Status, Props } from 'pages/Dashboard/types';
import { Post } from 'pages/Profile/types';

const Dashboard: React.FC<Props> = ({
    fetchAuthUserInfo,
    fetchAuthUserPosts,
    authUser,
    authUserPosts,
}) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [postStatus, setPostStatus] = useState<Status>({
        type: '',
        message: '',
    });
    const [user, setUser] = useState<User>();
    const { userId }: { userId?: string | undefined } = useParams();
    const fetchPostsHandler = () => {
        if (userId) {
            getUserPosts(userId)
                .then((response: Post[]) => {
                    setPosts(response);
                })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .catch((err: any) => {});
        } else {
            fetchAuthUserPosts().then((response: AxiosResponse) => response);
        }
    };

    const fetchUserHandler = () => {
        if (userId) {
            getUserInfo(userId)
                .then((response: User) => {
                    setUser(response);
                })
                .catch((err: AxiosError) => {
                    console.log(err);
                });
        } else {
            fetchAuthUserInfo().then((response: AxiosResponse) => response);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchPostsHandler, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchUserHandler, []);

    return (
        <ErrorBoundary>
            <>
                {!userId
                    ? authUser &&
                      authUser.profile && (
                          <>
                              <ProfileImagesSection user={authUser} allowEdit />
                              <ProfileContainer>
                                  <Row>
                                      <Col md='4'>
                                          <UserInfoAccordian
                                              userInfo={authUser.profile}
                                          />
                                      </Col>
                                      <Col md='8'>
                                          {postStatus.type !== '' &&
                                          showAlert ? (
                                              <Alert
                                                  variant={postStatus.type}
                                                  onClose={() =>
                                                      setShowAlert(false)
                                                  }
                                                  dismissible
                                              >
                                                  {postStatus.message}
                                              </Alert>
                                          ) : (
                                              ''
                                          )}
                                          <CreatePostPrompt
                                              setPostStatus={setPostStatus}
                                              setShowAlert={setShowAlert}
                                          />
                                          {authUserPosts && (
                                              <>
                                                  {' '}
                                                  <Posts
                                                      userName={`${authUser.first_name} ${authUser.last_name}`}
                                                      userProfilePicture={
                                                          authUser.profile
                                                              .profile_picture
                                                      }
                                                      posts={authUserPosts}
                                                  />
                                              </>
                                          )}
                                      </Col>
                                  </Row>
                              </ProfileContainer>{' '}
                          </>
                      )
                    : user &&
                      user.profile && (
                          <>
                              <ProfileImagesSection
                                  user={user}
                                  allowEdit={false}
                              />
                              <ProfileContainer>
                                  <Row>
                                      <Col md='4'>
                                          <UserInfoAccordian
                                              userInfo={user.profile}
                                          />
                                      </Col>
                                      <Col md='8'>
                                          {posts && (
                                              <>
                                                  {' '}
                                                  <Posts
                                                      userName={`${user.first_name} ${user.last_name}`}
                                                      userProfilePicture={
                                                          user.profile
                                                              .profile_picture
                                                      }
                                                      posts={posts}
                                                  />
                                              </>
                                          )}
                                      </Col>
                                  </Row>
                              </ProfileContainer>{' '}
                          </>
                      )}
            </>
        </ErrorBoundary>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        authUser: state.auth.user,
        authUserPosts: state.posts.posts,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAuthUserInfo: () => dispatch(fetchUserInfoAction()),
        fetchAuthUserPosts: () => dispatch(fetchUserPostsAction()),
    };
};
export const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Dashboard);
