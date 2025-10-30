require('dotenv').config();
const express = require('express');
const app = express();
const getdb = require('./db');


const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const apis = require('./routes/itemRoute');
app.use('/api',apis);

const port = process.env.PORT;


async function startServer() {
    try {
        await getdb(); 
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error("Failed to start application due to database error:", error.message);
    }
}
startServer();
