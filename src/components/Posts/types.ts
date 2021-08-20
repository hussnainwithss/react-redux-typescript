import { Post } from 'pages/Profile/types';

export interface Props {
    post: Post;
    userName: string;
    profilePicture: string;
}

export interface PostsProps {
    posts: Post[];
    userName: string;
    userProfilePicture: string;
}
