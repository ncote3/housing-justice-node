#!/usr/bin/env nodejs

const axios = require("axios").default;

async function pullRawPropertyDataCsv(limit) {
  let requestUrl =
    "https://phl.carto.com/api/v2/sql?q=SELECT * FROM opa_properties_public LIMIT 100";

  if (limit) {
    requestUrl = `https://phl.carto.com/api/v2/sql?q=SELECT * FROM opa_properties_public LIMIT ${limit}`;
  }

  return axios
    .get(requestUrl)
    .then(function (res) {
      const { status, data: resData } = res;

      if (status === 200) {
        return resData;
      } else {
        console.error("Bad status: ", status);
      }
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
}

module.exports = {
  pullRawPropertyDataCsv,
};
