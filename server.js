const express = require('express');

const app = express();

// routes
app.get('/', (req, res) => {
    res.send('Hello Node API');
})
app.listen(3000, () => {
    console.log('Node APi app is running on port 3000');
})