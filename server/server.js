const express = require('express')
const path = require('path');
const port = process.env.PORT || 5000



var app = express();
const publicPath = path.join(__dirname, '../public/');
app.use(express.static(publicPath))


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
})
