import map from 'lodash/map';
import size from 'lodash/size';
import last from 'lodash/last';
import replace from 'lodash/replace';
import { API_BASE_PATH } from 'config';

const ROUTES_OBJ: Record<string, string> = {
    login: `${API_BASE_PATH}/login/`,
    registerUser: `${API_BASE_PATH}/register/`,
    userProfile: `${API_BASE_PATH}/user/`,
    changePassword: `${API_BASE_PATH}/change-password/`,
    updateProfile: `${API_BASE_PATH}/update-profile/`,
    userPost: `${API_BASE_PATH}/post/`,
    updateProfileImages: `${API_BASE_PATH}/update-profile-pictures/`,
    userSearch: `${API_BASE_PATH}/search/?`,
};

/**
 * getRoute creates the URL through provided routeName & params arguments
 * @param  {string} routeName   any object name of ROUTES_OBJ e.g. login
 * @param  {Object} [params={}] param values replace with strings present <...>.
 * @return {string}             URL
 * @TODO: implement routing for array based data, if the value is an array then
 */
const getRoute = (
    routeName: string,
    params: Record<string, string | number | undefined> = {}
) => {
    let url: string = ROUTES_OBJ[routeName];

    if (
        (routeName === 'userProfile' || routeName === 'userPost') &&
        params.id !== undefined
    )
        url += '?id=<id>';
    const result = map(params, (val, key) => {
        const value: string | number | undefined = Array.isArray(val)
            ? val.join(',')
            : val;
        if (routeName === 'userSearch') url += `${key}=${value}&`;
        else {
            const regexPattern = `<${key}>`;
            url = replace(
                url as string,
                new RegExp(regexPattern, 'g'),
                value as string
            );
        }
        return routeName === 'userSearch' ? url?.slice(0, -1) : url;
    });
    url = size(result) > 0 ? (last(result) as string) : (url as string);
    return url;
};

export default getRoute;
