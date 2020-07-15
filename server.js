require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const s3  = new AWS.S3({
    accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

const app = express();

app.use(cors());

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8000;
}
app.listen(port);

console.log("listening at port: %s", port);

const downloadJSONFromS3 = (filePath, bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key
    };
    s3.getObject(params, (err, data) => {
        if (err) console.error(err);
        fs.writeFileSync(filePath, data.Body.toString());
        console.log(`${filePath} has been created!`);
    });
}

const filePath = './data/';
const significant_sorted_landlords = 'significant_sorted_landlords.json';
const landlords_and_properties = 'landlords_and_properties.json';
const significant_landlords = 'significant_landlords.json';
const landlords = 'landlords.json';

if (!fs.existsSync(filePath+significant_sorted_landlords)) {
    console.log('Trying to download significant_sorted_landlords data from AWS S3 bucket.');
    downloadJSONFromS3(
        filePath+significant_sorted_landlords,
        process.env.BUCKETEER_BUCKET_NAME,
        significant_sorted_landlords
    );
}
if (!fs.existsSync(filePath+landlords_and_properties)) {
    console.log('Trying to download landlords_and_properties data from AWS S3 bucket.');
    downloadJSONFromS3(
        filePath+landlords_and_properties,
        process.env.BUCKETEER_BUCKET_NAME,
        landlords_and_properties
    );
}
if (!fs.existsSync(filePath+significant_landlords)) {
    console.log('Trying to download significant_landlords data from AWS S3 bucket.');
    downloadJSONFromS3(
        filePath+significant_landlords,
        process.env.BUCKETEER_BUCKET_NAME,
        significant_landlords
    );
}
if (!fs.existsSync(filePath+landlords)) {
    console.log('Trying to download landlords data from AWS S3 bucket.');
    downloadJSONFromS3(
        filePath+landlords,
        process.env.BUCKETEER_BUCKET_NAME,
        landlords
    );
}


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

