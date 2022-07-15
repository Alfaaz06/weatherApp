import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const weatherReducer = createReducer(initialState, {
    weatherRequest: (state, action) => {
        state.loading = true
    },
    weatherSuccess: (state, action) => {
        state.loading = false
        state.weather = action.payload
    },
    weatherFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    }
})