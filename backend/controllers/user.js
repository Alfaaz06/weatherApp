import User from '../models/user.js';
import fetch from 'node-fetch';

export const registerUser = async(req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            });
        }
        await User.create({ username, password });
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const loginUser = async(req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Username and password do not  match'
            });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Username and password do not match'
            });
        }

        const token = await user.genrateToken();

        const options = { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: 'Login successful'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logoutUser = async(req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            logoutMessage: 'Logged Out Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            return res.status(200).json({
                success: true,
                user
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User not found"
        });
    }
}

export const addPlace = async(req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        for (let index = 0; index < user.savedPlaces.length; index++) {
            if (user.savedPlaces[index].cityName === req.body.cityName) {
                return res.status(200).json({
                    success: false,
                    message: 'This place already exists'
                })
            }
        }
        user.savedPlaces.push(req.body);
        await user.save();
        return res.status(200).json({
            success: true,
            message: req.body.cityName + ' added to your profile'
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'Please login to add places.'
        });
    }
}

export const removePlace = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { place } = req.body;
        if (user) {
            for (let index = 0; index < user.savedPlaces.length; index++) {
                if (user.savedPlaces[index].cityName === place) {
                    user.savedPlaces.splice(index, 1);
                    await user.save();
                    return res.status(200).json({
                        success: true,
                        message: place + " removed from your profile"
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const quoteApi = async(req, res) => {
    try {
        let quote = await fetch(`https://zenquotes.io/api/quotes`);
        quote = await quote.json();
        const randomNumber = Math.floor(Math.random() * (quote.length + 1));
        quote = quote[randomNumber].q;
        return res.status(200).json({
            success: true,
            quote
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}