export enum UserAPIs {
    'GetUsers' = '/api/users/',
    'SignUpUser' = '/api/users/signup',
    'LoginUser' = '/api/users/login',
}

export const getEndPoint = `${process.env.REACT_APP_BACK_END_DOMAIN}:${process.env.REACT_APP_BACK_END_PORT}`;