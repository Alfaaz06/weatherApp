import fetch from "node-fetch";
import User from "../models/user.js";

export const apiData = async(req, res) => {
    try {
        let { cityName } = req.body;
        let geoCode = {}
        if (cityName.length > 0) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.appId}`);
            const data = await response.json();
            geoCode = data.coord;
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoCode.lat}&lon=${geoCode.lon}&appid=${process.env.appId}&exclude=minutely&units=metric&`);
        const weatherData = await response.json();
        return res.status(200).json({
            success: true,
            weatherData
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const fetchSavedPlaces = async(req, res) => {
    try {
        const data = [];
        const user = await User.findById(req.user._id);
        if (user) {
            for (let i = 0; i < user.savedPlaces.length; i++) {
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${user.savedPlaces[i].cityName}&appid=${process.env.appId}&units=metric`);
                response = await response.json();
                data.push({
                    city: response.name,
                    temperature: response.main.temp,
                    icon: response.weather[0].icon,
                    description: response.weather[0].description,
                    min: response.main.temp_min,
                    max: response.main.temp_max
                })
            }
            return res.status(200).json({
                success: true,
                savedPlaceData: data
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not a valid Place or not a valid user"
        });
    }
}