import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const userReducer = createReducer(initialState, {
    userRequest: (state, action) => {
        state.loading = true
        state.isAuthenticated = false;
    },

    userSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true;
    },

    userFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false;
    },
    getUserRequest: (state, action) => {
        state.loading = true
        state.isAuthenticated = false;
    },
    getUserSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true;
    },
    getUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false;
    },
});

export const loginReducer = createReducer(initialState, {
    loginRequest: (state, action) => {
        state.loading = true
        state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
        state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false;
    },
    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => { state.message = null }
})

export const getSavedPlaceReducer = createReducer(initialState, {
    getSavedPlaceRequest: (state, action) => {
        state.loading = true
    },
    getSavedPlaceSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    getSavedPlaceFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => { state.message = null }
});


export const registerUserReducer = createReducer(initialState, {
    registerRequest: (state, action) => {
        state.loading = true
        state.isAuthenticated = false;
    },
    registerSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
        state.isAuthenticated = true;
    },
    registerFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false;
    },
    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => { state.message = null }
})

export const savedPlacesReducer = createReducer(initialState, {
    savedPlaceRequest: (state, action) => {
        state.loading = true
    },
    savedPlaceSuccess: (state, action) => {
        state.loading = false
        state.savedPlaceData = action.payload
    },
    savedPlaceFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    },
})

export const removePlaceReducer = createReducer(initialState, {
    removePlaceRequest: (state, action) => {
        state.loading = true
    },
    removePlaceSuccess: (state, action) => {
        state.loading = false
        state.RemoveMessage = action.payload
    },
    removePlaceFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => { state.RemoveMessage = null }
})

export const logoutReducer = createReducer(initialState, {
    logoutRequest: (state, action) => {
        state.loading = true
    },
    logoutSuccess: (state, action) => {
        state.loading = false
        state.logoutmessage = action.payload
        state.isAuthenticated = false
        state.user = null
    },
    logoutFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    },
    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.error = null
    }

})

export const quoteReducer = createReducer(initialState, {
    quoteRequest: (state, action) => {
        state.loading = true
    },
    quoteSuccess: (state, action) => {
        state.loading = false
        state.quote = action.payload
    },
    quoteFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    }
})