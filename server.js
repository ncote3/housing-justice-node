const fs = require('fs');
const express = require('express');

const app = express();

const server = app.listen(8081, function () {
    const host = "0.0.0.0"
    const port = server.address().port

    console.log("listening at http://%s:%s", host, port)
    console.log("http://0.0.0.0:8081/landlords")
    console.log("http://0.0.0.0:8081/properties")
    console.log("http://0.0.0.0:8081/landlords-and-properties")
})

app.get('/', (req, res) => {
    return res.send("Are ya coding son?");
});

// Returns a object of landlords and how many properties they own.
// Will be useful for populating a list of landlords to show on the map.
app.get('/landlords', (req, res) => {
    const landlords = JSON.parse(fs.readFileSync('./data/landlords.json', 'utf8'));
    return res.send(landlords);
});

// Returns an object of addresses.
// Can be used for auto-filling search boxes for landlord grouping.
app.get('/properties', (req, res) => {
    const properties = JSON.parse(fs.readFileSync('./data/properties.json', 'utf8'));
    return res.send(JSON.stringify(properties));
});

// Returns an object of landlords with data on addresses, geo coords, number of properties.
// Useful for returning a smaller number of objects
app.get('/landlords-and-properties/:landlord', (req, res) => {
    const landlordsAndProperties = JSON.parse(
        fs.readFileSync('./data/landlords_and_properties.json', 'utf8')
    );
    return res.send(landlordsAndProperties[req.params.landlord]);
});

