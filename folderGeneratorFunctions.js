#!/usr/bin/env nodejs

const fs = require("fs");
const path = require("path");

const dataFolderPath = path.join(__dirname, "data");
const rawDataPath = path.join(dataFolderPath, "raw");
const serverDataPath = path.join(dataFolderPath, "server");
const experimentalDataPath = path.join(dataFolderPath, "experimental");

function createDataFolder(overwrite) {
  fs.mkdir(dataFolderPath, { recursive: overwrite }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`${dataFolderPath} created successfully!`);
  });
}

function createRawFolder(overwrite) {
  fs.mkdir(rawDataPath, { recursive: overwrite }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`${rawDataPath} created successfully!`);
  });
}

function createServerFolder(overwrite) {
  fs.mkdir(serverDataPath, { recursive: overwrite }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`${serverDataPath} created successfully!`);
  });
}

function createExperimentalFolder(overwrite) {
  fs.mkdir(experimentalDataPath, { recursive: overwrite }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`${experimentalDataPath} created successfully!`);
  });
}

function createFullFolderStructure(overwrite) {
  createDataFolder(overwrite);
  createRawFolder(overwrite);
  createServerFolder(overwrite);
  createExperimentalFolder(overwrite);
}

function createServerFolderStructure(overwrite) {
  createDataFolder(overwrite);
  createRawFolder(overwrite);
  createServerFolder(overwrite);
  createExperimentalFolder(overwrite);
}

module.exports = {
  createFullFolderStructure,
  createServerFolderStructure,
};
