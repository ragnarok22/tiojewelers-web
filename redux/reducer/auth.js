import * as actionTypes from "../actions/actionTypes";
const initialState = {
    login: {
        isAuthenticated: false,
    },
    user: {
        language: "en",
        isActive: false,
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        address1: '',
        address2: '',
        city: '',
        province: '',
        provinceCode: '',
        country: '',
        countryCode: '',
        zip: '',
        phone: '',
        photo: '',
        favoProd: [],
    },
};

const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state, login: { ...state.login, ...action.data.login }, user: { ...state.user, ...action.data.store_user }
            };
        case actionTypes.LOGOUT:
            return {
                ...state, login: {isAuthenticated: false}, user: {
                    language: "en",
                    isActive: false,
                    firstName: '',
                    lastName: '',
                    email: '',
                    company: '',
                    address1: '',
                    address2: '',
                    city: '',
                    province: '',
                    provinceCode: '',
                    country: '',
                    countryCode: '',
                    zip: '',
                    phone: '',
                    photo: '',
                    favoProd: [],
                },
            };
        case actionTypes.ACTIVATE:
            return {
                ...state, user: { ...state.user, ...action.data.active }
            };
        case actionTypes.UPDATE_PROFILE:
            return {
                ...state, user: { ...state.user, ...action.data }
            };
        case actionTypes.ADD_FAVORITES:
            return {
                ...state, user: { ...state.user, favoProd: [...state.user.favoProd, action.data] }
            };
        case actionTypes.DEL_FAVORITES:
            return {
                ...state, user: { ...state.user, favoProd: state.user.favoProd.filter(item => item !== action.data) }
            };
        default:
            return state;
    }
};

export default authReducer