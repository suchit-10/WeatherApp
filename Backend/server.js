import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Weather API route
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY; // Add your OpenWeatherMap API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(404).send({ message: 'City not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
