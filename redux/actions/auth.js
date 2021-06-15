import * as actionTypes from "./actionTypes";
import { deleteToken, setToken } from '../../config/api/Security';
import { displayProtectedImage } from '../../helpers/convertImage';
import { BASE_API } from '../../config/api/Security';

import {
    login as apiLogin,
    profile as apiProfile,
    logout as apiLogout,
    registration as apiRegister,
    updateProfile as apiUpdateProfile,
    forgotPassword as apiForgotPassword,
    resetPassword as apiResetPassword,
    updatePassword as apiUpdatePassword,
    activateUser as apiActivateUser,
    resendCode as apiResendCode,
    deleteUser as apiDelete,
    subscribe as subscribeApi,
    updateProfilePicture as updateProfilePictureApi
} from '../../config/api/account';
import {
    addFavorites as addFavoritesApi,
    delFavorites as delFavoritesApi,
    getFavorites as getFavoritesApi
} from '../../config/api/products';

export const authentication = (credentials, callback) => async dispatch => {
    let prompt = ''
    let userS = {}
    let data = {}
    try {
        const { status, data: { access_token } } = await apiLogin(credentials);
        if (status === 200 && access_token) {

            setToken(access_token)
            const { data: user } = await apiProfile();

            let imgUrl = null;
            if (user.photoId) {
                imgUrl = await displayProtectedImage(`${BASE_API}/media/private/${user.photoId}`, access_token);
            }
            let { data: likes } = await getFavoritesApi(access_token);
            let favo = likes.map(item => item.id);

            userS = {
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                company: user.company || '',
                address1: user.address1 || '',
                address2: user.address2 || '',
                city: user.city || '',
                province: user.province || '',
                provinceCode: user.provinceCode || '',
                country: user.country || '',
                countryCode: user.countryCode || '',
                zip: user.zip || '',
                phone: user.phone || '',
                photo: imgUrl || '',
                language: user.language || 'en',
                favoProd: favo || [],
            }

            let isActive = user.activationCode ? false : true;

            if (status === 200) {
                data = {
                    login: {
                        isAuthenticated: true,
                    },
                    store_user: {
                        ...userS,
                        isActive: isActive,
                    }
                };

                dispatch({
                    type: actionTypes.LOGIN,
                    data
                });
            }
        } else if (status === 403 || status === 401) {
            prompt = `Wrong user or password`;
        }
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`;
    }

    if (typeof callback === "function") {
        callback({ prompt: prompt, lang: userS.language });
    }
}
export const registration = (credentials, callback) => async dispatch => {
    let prompt = '';
    try {
        let res = await apiRegister(credentials);
        if (res) {
            dispatch(
                authentication(credentials, callback => {
                    if (callback.prompt) {
                        prompt = callback.prompt
                    }
                }))
        }
    } catch (error) {
        if (error.response.status === 410) {
            prompt = 'This email can no longer signup in this site'
        } else if (error.response.status === 409) {
            prompt = 'This email already is available in this site'
        } else {
            prompt = `It had ocurred an ${error.message}`
        }
    }

    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const logout = (callback) => async dispatch => {
    let prompt = ''
    try {
        await apiLogout();
        dispatch({
            type: actionTypes.LOGOUT,
        });
        deleteToken();
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`;
    }

    if (typeof callback === "function") {
        callback({ prompt: prompt, lang: 'en' });
    }
}
export const updateProfile = ({ isActive, photo,...rest }, {photo: pic, ...newData}, callback) => async dispatch => {
    let prompt = ''
    try {
        const { status } = await apiUpdateProfile({ ...rest }, {...newData});
        if (status === 200) {
            dispatch({
                type: actionTypes.UPDATE_PROFILE,
                data: newData
            });
        }
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const resendCode = (callback) => async dispatch => {
    let prompt = ''
    try {
        await apiResendCode();
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`;
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const activateUser = (code, callback) => async dispatch => {
    let prompt = ''
    let data = {};
    try {
        const { status } = await apiActivateUser(code);
        if (status === 204) {
            data = {
                active: {
                    isActive: true
                }
            };
            dispatch({
                type: actionTypes.ACTIVATE,
                data
            });
        }
    } catch (error) {
        prompt = `It had ocurred an error: ${error.message}`;
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const updatePassword = (currentPassword, newPassword, callback) => async dispatch => {
    let prompt = ''

    try {
        await apiUpdatePassword(currentPassword, newPassword);
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`;
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const forgotPassword = (email, callback) => async dispatch => {
    let prompt = ''
    try {
        await apiForgotPassword(email);
        localStorage.setItem('e-recover', email);
    } catch (error) {

        prompt = `It had ocurred an error ${error}`

    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const resetPassword = (code, password, callback) => async dispatch => {
    let prompt = ''
    let email = localStorage.getItem('e-recover');
    try {
        await apiResetPassword(code, password, email);
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`;
    }
    if (typeof callback === "function") {
        callback({ status });
    }
}
export const deleteUser = (password, callback) => async dispatch => {
    let prompt = ''
    try {
        const { status: delete_status } = await apiDelete(password);
        if (delete_status === 204) {
            let data = {
                isAuthenticated: false,
            };
            dispatch({
                type: actionTypes.LOGOUT,
                data
            });
        }
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const subscription = async (email, callback) => {
    let prompt = ''
    try {
        await subscribeApi(email);
    } catch (error) {
        if (error.response.status === 400) {
            prompt = `You're already subscribed`;

        } else {
            prompt = `It had ocurred an error: ${error}`
        }

    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}

export const updateProfilePicture = (data, profileImg, callback) => async dispatch => {
    let prompt = ''
    try {
        const { status } = await updateProfilePictureApi(data);
        if (status === 200) {
            dispatch({
                type: actionTypes.UPDATE_PROFILE,
                data: {
                    photo: profileImg
                }
            });
        }
    } catch (error) {
        prompt = `It had ocurred an error: ${error}`
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}

export const addFavorites = (id, callback) => async dispatch => {
    let prompt = '';
    try {
        dispatch({
            type: actionTypes.ADD_FAVORITES,
            data: id
        });
        let res = await addFavoritesApi(id);
        if (!res) {
            prompt = '401'
            dispatch({
                type: actionTypes.DEL_FAVORITES,
                data: id
            });
        }
    } catch (error) {
        prompt = `It had ocurred an error ${error}`
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}
export const delFavorites = (id, callback) => async dispatch => {
    let prompt = ''
    try {
        dispatch({
            type: actionTypes.DEL_FAVORITES,
            data: id
        });
        let res = await delFavoritesApi(id);
        if (!res) {
            prompt = '401'
            dispatch({
                type: actionTypes.DEL_FAVORITES,
                data: id
            });
        }
    } catch (error) {
        prompt = `It had ocurred an error ${error}`
    }
    if (typeof callback === "function") {
        callback({ prompt });
    }
}



