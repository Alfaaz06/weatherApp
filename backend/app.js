import express from 'express';
import cookieParser from 'cookie-parser';
export const app = express();
import Weather from './routes/weather.js';
import User from './routes/user.js';
import path from 'path';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', Weather);
app.use('/api/v1', User);

// app.use(express.static(path.resolve(" ./frontend/build")));
// app.use(express.static(path.resolve("./frontend/build")));
// app.get('/*', function(req, res) {
//     res.sendFile(path.resolve("./frontend/build/index.html"));
// });