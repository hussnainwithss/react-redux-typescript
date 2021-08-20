export interface Profile {
    bio: string;
    gender: string;
    work: string;
    education: string;
    hometown: string;
    birthday: string;
    relationship_status: string;
    profile_picture: string;
    cover_picture: string;
}
export interface User {
    id: number | string;
    first_name: string;
    last_name: string;
    email: string;
    profile__age: number;
    profile: Profile;
}

export interface Props {
    user: User;
    allowEdit: boolean;
}
