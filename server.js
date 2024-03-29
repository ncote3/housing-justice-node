#!/usr/bin/env nodejs
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const FolderGenerator = require("./folderGeneratorFunctions");
const DataPull = require("./dataPullingFunctions");

const app = express();

app.use(cors());

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8000;
}
app.listen(port);

console.log("listening at port: %s", port);

app.get("/", (req, res) => {
  return res.send("Are ya coding son?");
});

// Returns a object of landlords and how many properties they own.
// Will be useful for populating a list of landlords to show on the map.
app.get("/api/landlords", (req, res) => {
  const landlords = JSON.parse(
    fs.readFileSync("./data/landlords.json", "utf8")
  );
  return res.send(landlords);
});

// Returns a object of significant landlords (Own more than 50 Props) and how many properties they own.
// Will be useful for testing.
app.get("/api/significant-landlords", (req, res) => {
  const landlords = JSON.parse(
    fs.readFileSync("./data/significant_landlords.json", "utf8")
  );
  return res.send({ info: Object.keys(landlords) });
});

// Returns a object of significant landlords (Own more than 50 Props) and how many properties they own.
// Will be useful for testing.
app.get("/api/significant-sorted-landlords", (req, res) => {
  const landlords = JSON.parse(
    fs.readFileSync("./data/significant_sorted_landlords.json", "utf8")
  );
  return res.send({ info: landlords });
});

// Not used
// Returns an object of addresses.
// Can be used for auto-filling search boxes for landlord grouping.
app.get("/api/properties", (req, res) => {
  const properties = JSON.parse(
    fs.readFileSync("./data/properties.json", "utf8")
  );
  return res.send(JSON.stringify(properties));
});

// Returns an object of landlords with data on addresses, geo coords, number of properties.
// Useful for returning a smaller number of objects
app.get("/api/landlords-and-properties/:landlord", (req, res) => {
  const landlordsAndProperties = JSON.parse(
    fs.readFileSync("./data/landlords_and_properties.json", "utf8")
  );
  return res.send(landlordsAndProperties[req.params.landlord]);
});

app.get("/api/zip-code-bar-data", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync("./data/zip_code_bar_data.json", "utf8")
  );
  return res.send(data);
});

app.get("/api/zip-code-bar-data/:zipCode", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync("./data/zip_code_bar_data.json", "utf8")
  );
  return res.send(data[req.params.zipCode]);
});

app.get("/api/zip-codes/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/zip_codes.json", "utf8"));
  return res.send(data);
});

app.get("/api/cw_property_dist/", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync("./data/city_wide_dist.json", "utf8")
  );
  return res.send(data);
});

app.get("/api/generator", async (req, res) => {
  // FolderGenerator.createFullFolderStructure(true);

  const data = await DataPull.pullRawPropertyDataCsv();

  fs.writeFileSync("./data/raw/OPA_all.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });

  const SUCCESS_MESSAGE = `Wrote ${data.total_rows} to file.`;

  console.log(SUCCESS_MESSAGE);

  return res.send(SUCCESS_MESSAGE);
});
