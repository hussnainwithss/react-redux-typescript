import React from 'react';
import { Card } from 'react-bootstrap';
import Post from 'components/Posts/Post';
import { PostsProps } from 'components/Posts/types';

const Posts: React.FC<PostsProps> = (props: PostsProps) => {
    const { posts, userName, userProfilePicture } = props;
    return (
        <>
            {posts && (
                <>
                    {posts.length !== 0 ? (
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        posts.map((post: any, index: number) => {
                            return (
                                <Post
                                    post={post}
                                    key={`${post.content}-${post.created_at}`}
                                    userName={userName}
                                    profilePicture={userProfilePicture}
                                />
                            );
                        })
                    ) : (
                        <Card>
                            <Card.Body>No posts yet!</Card.Body>
                        </Card>
                    )}
                </>
            )}
        </>
    );
};

export default Posts;
