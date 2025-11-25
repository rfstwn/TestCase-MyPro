const express = require('express');
const app = express();
const portcallRouter = require('./routes/portcall');

app.use('/portcall', portcallRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
