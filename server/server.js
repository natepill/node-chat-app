const express = require('express')
const path = require('path');
const port = process.env.port || 5000



var app = express();
const publicPath = path.join(__dirname, '../public/');
app.use(express.static(publicPath))


app.listen(5000, () => {
    console.log(`Server is up on ${port}`);
})
