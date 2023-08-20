const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Serve the current number from the JSON file
app.get('/get-number', async (req, res) => {
    try {
        const data = await fs.readFile('number.json', 'utf-8');
        const number = JSON.parse(data).number;
        res.json({ number });
    } catch (error) {
        console.error('Error reading number:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update the number in the JSON file
app.post('/update-number', async (req, res) => {
    const newNumber = req.body.number;
    if (newNumber >= 0 && newNumber <= 9) {
        try {
            await fs.writeFile('number.json', JSON.stringify({ number: newNumber }));
            res.sendStatus(200);
        } catch (error) {
            console.error('Error updating number:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: 'Invalid number' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
