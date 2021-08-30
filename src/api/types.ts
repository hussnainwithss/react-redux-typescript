export interface RegisterUserTypes {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    gender: string;
    birthday: string;
}

export interface authenticateUserProps {
    username: string;
    password: string;
}
