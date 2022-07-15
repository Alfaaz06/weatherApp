import axios from 'axios';

export const getWeather = ({ cityName }) => async(dispatch) => {
    dispatch({ type: 'weatherRequest' });
    try {
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/apiData`, { cityName }, config);
        dispatch({ type: 'weatherSuccess', payload: data.weatherData });
    } catch (error) {
        dispatch({ type: 'weatherFailure', payload: error.message });
    }
}