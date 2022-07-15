import express from 'express';
import { apiData } from '../controllers/weather.js';
const Router = express.Router();

Router.route('/apiData').post(apiData);

export default Router;