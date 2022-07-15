import axios from 'axios';

export const register = ({ username, password, confirmPassword }) => async(dispatch) => {
    dispatch({ type: 'registerRequest' });
    try {
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/register`, { username, password, confirmPassword }, config);
        dispatch({ type: 'registerSuccess', payload: data.message });

    } catch (error) {
        dispatch({ type: 'registerFailure', payload: error.response.data.message });
    }
}



export const login = (username, password) => async(dispatch) => {
    dispatch({ type: 'loginRequest' });
    try {
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/login`, { username, password }, config);
        dispatch({ type: 'loginSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'loginFailure', payload: error.response.data.message });
    }
}

export const getUser = () => async(dispatch) => {
    dispatch({ type: 'getUserRequest' });
    try {
        const { data } = await axios.get(`/api/v1/user`);
        dispatch({ type: 'getUserSuccess', payload: data.user });
    } catch (error) {
        dispatch({ type: 'getUserFailure', payload: error.message });
    }
}

export const savePlace = ({ cityName }) => async(dispatch) => {
    dispatch({ type: 'getSavedPlaceRequest' });
    try {
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/savePlace`, { cityName }, config);
        dispatch({ type: 'getSavedPlaceSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'getSavedPlaceFailure', payload: error.message });
    }
}

export const savedPlaces = () => async(dispatch) => {
    dispatch({ type: 'savedPlaceRequest' });
    try {
        const { data } = await axios.get(`/api/v1/savedPlaces`);
        dispatch({ type: 'savedPlaceSuccess', payload: data.savedPlaceData });
    } catch (error) {
        dispatch({ type: 'savedPlaceFailure', payload: error.message });
    }
}

export const removePlace = ({ place }) => async(dispatch) => {
    dispatch({ type: 'removePlaceRequest' });
    try {
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/removePlace`, { place }, config);
        dispatch({ type: 'removePlaceSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'removePlaceFailure', payload: error.message });
    }
}

export const logout = () => async(dispatch) => {
    dispatch({ type: 'logoutRequest' });
    try {
        const { data } = await axios.get(`/api/v1/logout`);
        dispatch({ type: 'logoutSuccess', payload: data.logoutMessage });
    } catch (error) {
        dispatch({ type: 'logoutFailure', payload: error.response.data.message });
    }
}

export const Quote = () => async(dispatch) => {
    dispatch({ type: 'quoteRequest' });
    try {
        const { data } = await axios.get(`/api/v1/quote`);
        dispatch({ type: 'quoteSuccess', payload: data.quote });
    } catch (error) {
        dispatch({ type: 'quoteFailure', payload: error.message });
    }
}