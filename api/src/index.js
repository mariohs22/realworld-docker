const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { port, db, authApiUrl } = require('./configuration');

const app = express();

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port ${port}`);
        console.log(`Our database: ${db}`);

        // Post.find((err, posts) => {
        //     if (err) return console.error(err);
        //     console.log('posts', posts);
        // });

        const silence = new Post({ name: 'Silence' });
        silence.save((err, savedPost) => {
            if (err) return console.error(err);
            console.log('savedPost with volumes', savedPost);
        })
        
        //console.log(silence.name);
    })
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly')
});

app.get('/api/testapidata', (req, res) => {
    res.json({
        testwithapi: true
    });
});

app.get('/testwithcurrentuser', (req, res) => {
    axios.get(authApiUrl + '/currentUser').then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        })
    });
});
