import Api from 'src/core/api'

const register = (email, password) => {
    return Api.post('/authentication/register', { email: email, password: password }, null, { getAll: true });
}

const forgottenPassword = () => {
    return Api.get('/authentication/forgottenPassword', { options : { getAll: true }});
}

const login = (email, password) => {
    return Api.post('/authentication/login', { email: email, password: password });
}

const googleLogin = (idToken) => {
    return Api.post('/authentication/google', { IdToken: idToken });
}

const changePassword = async (data) => {
    return await Api.post('/authentication/changepassword', data);
}


export const authService = {
    register,
    login,
    googleLogin,
    forgottenPassword,
    changePassword
}
