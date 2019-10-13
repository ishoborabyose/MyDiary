/* Import packages */
const express = require('express');

const expressApp = express();

const PORT = 3000;

expressApp.get('/', (req, res) => {
    res.send('Welcome to MyDiary.');
});

expressApp.listen(3000, () => console.log(`Server is running on http://localhost:${PORT}`));