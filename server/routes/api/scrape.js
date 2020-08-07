const request = require("request");
const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const { json } = require("body-parser");

const key = process.env.REACT_APP_API_KEY;

router.post("/", (req, res) => {
  request(req.body.url, (err, response, html) => {
    if (!err && res.statusCode == 200) {
      fetch("http://localhost:8000/newspaper/" + "?url=" + req.body.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((jsonData) => {
          res.send(jsonData);
        });
    }
})
})

module.exports = router;
