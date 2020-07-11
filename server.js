const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const server = app.listen(8081, function () {
    const host = "0.0.0.0"
    const port = server.address().port

    console.log("listening at http://%s:%s", host, port)
    console.log("http://0.0.0.0:8081/api/landlords")
    console.log("http://0.0.0.0:8081/api/properties")
    console.log("http://0.0.0.0:8081/api/landlords-and-properties")
    console.log("http://0.0.0.0:8081/api/significant-landlords")
})

app.get('/', (req, res) => {
    return res.send("Are ya coding son?");
});

// Returns a object of landlords and how many properties they own.
// Will be useful for populating a list of landlords to show on the map.
app.get('/api/landlords', (req, res) => {
    const landlords = JSON.parse(fs.readFileSync('./data/landlords.json', 'utf8'));
    return res.send(landlords);
});

// Returns a object of significant landlords (Own more than 50 Props) and how many properties they own.
// Will be useful for testing.
app.get('/api/significant-landlords', (req, res) => {
    const landlords = JSON.parse(fs.readFileSync('./data/significant_landlords.json', 'utf8'));
    return res.send({info: Object.keys(landlords)});
});

// Returns a object of significant landlords (Own more than 50 Props) and how many properties they own.
// Will be useful for testing.
app.get('/api/significant-sorted-landlords', (req, res) => {
    const landlords = JSON.parse(fs.readFileSync('./data/significant_sorted_landlords.json', 'utf8'));
    return res.send({info: landlords});
});

// Returns an object of addresses.
// Can be used for auto-filling search boxes for landlord grouping.
app.get('/api/properties', (req, res) => {
    const properties = JSON.parse(fs.readFileSync('./data/properties.json', 'utf8'));
    return res.send(JSON.stringify(properties));
});

// Returns an object of landlords with data on addresses, geo coords, number of properties.
// Useful for returning a smaller number of objects
app.get('/api/landlords-and-properties/:landlord', (req, res) => {
    const landlordsAndProperties = JSON.parse(
        fs.readFileSync('./data/landlords_and_properties.json', 'utf8')
    );
    return res.send(landlordsAndProperties[req.params.landlord]);
});

