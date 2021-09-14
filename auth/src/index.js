const express = require('express');
const { connectDb } = require('./helpers/db');
const { port, db, apiUrl } = require('./configuration');
const axios = require('axios');

const app = express();


const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`Our database: ${db}`);

    })
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);

app.get('/test', (req, res) => {
    res.send('Our auth api server is working correctly')
});

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata').then(response => {
        res.json({
            testapidata: response.data.testapidata

        });
    });
    res.json({
        testwithapi: true
    });
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: "1234",
        email: "test@realworld-docker.com"
    });
    res.send('Our auth api server is working correctly')
});
