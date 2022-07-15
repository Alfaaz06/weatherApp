import express from 'express';
import { addPlace, getUser, loginUser, logoutUser, quoteApi, registerUser, removePlace } from '../controllers/user.js';
import { fetchSavedPlaces } from '../controllers/weather.js';
import { isAuthenticated } from '../middlewares/auth.js';

const Router = express.Router();

Router.route('/register').post(registerUser);
Router.route('/login').post(loginUser);
Router.route('/logout').get(logoutUser);
Router.route('/user').get(isAuthenticated, getUser);
Router.route('/savedPlaces').get(isAuthenticated, fetchSavedPlaces);
Router.route('/savePlace').put(isAuthenticated, addPlace)
Router.route('/removePlace').put(isAuthenticated, removePlace)
Router.route('/quote').get(isAuthenticated, quoteApi);

export default Router;