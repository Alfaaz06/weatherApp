import { configureStore } from '@reduxjs/toolkit';
import { weatherReducer } from './Reducers/reducer';
import { getSavedPlaceReducer, loginReducer, logoutReducer, quoteReducer, registerUserReducer, removePlaceReducer, savedPlacesReducer, userReducer } from './Reducers/userReducer';


export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        user: userReducer,
        register: registerUserReducer,
        savedPlace: savedPlacesReducer,
        savePlace: getSavedPlaceReducer,
        removePlace: removePlaceReducer,
        logout: logoutReducer,
        login: loginReducer,
        quote: quoteReducer
    }
})