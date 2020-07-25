#!/usr/bin/env nodejs
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8000;
}
app.listen(port);

console.log("listening at port: %s", port);

const filePath = './';
const significant_sorted_landlords = 'significant_sorted_landlords.json';
const landlords_and_properties = 'landlords_and_properties.json';
const significant_landlords = 'significant_landlords.json';
const landlords = 'landlords.json';

app.get('/', (req, res) => {
    return res.send("Are ya coding son?");
});

// Returns a object of landlords and how many properties they own.
// Will be useful for populating a list of landlords to show on the map.
app.get('/api/landlords', (req, res) => {
    const landlords = JSON.parse(fs.readFileSync('./landlords.json', 'utf8'));
    return res.send(landlords);
});

// Returns a object of significant landlords (Own more than 50 Props) and how many properties they own.
// Will be useful for testing.
app.get('/api/significant-landlords', (req, res) => {
    const landlords = JSON.parse(fs.readFileSync('./significant_landlords.json', 'utf8'));
    return res.send({info: Object.keys(landlords)});
});

// Returns a object of significant landlords (Own more than 50 Props) and how many properties they own.
// Will be useful for testing.
app.get('/api/significant-sorted-landlords', (req, res) => {
    const landlords = JSON.parse(fs.readFileSync('./significant_sorted_landlords.json', 'utf8'));
    return res.send({info: landlords});
});


// Not used
// Returns an object of addresses.
// Can be used for auto-filling search boxes for landlord grouping.
// app.get('/api/properties', (req, res) => {
//     const properties = JSON.parse(fs.readFileSync('./properties.json', 'utf8'));
//     return res.send(JSON.stringify(properties));
// });

// Returns an object of landlords with data on addresses, geo coords, number of properties.
// Useful for returning a smaller number of objects
app.get('/api/landlords-and-properties/:landlord', (req, res) => {
    const landlordsAndProperties = JSON.parse(
        fs.readFileSync('./landlords_and_properties.json', 'utf8')
    );
    return res.send(landlordsAndProperties[req.params.landlord]);
});

