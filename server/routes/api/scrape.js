const request = require('request')
const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const fetch = require('node-fetch');

const key = process.env.REACT_APP_API_KEY;

router.post('/', (req,res) => {
    request(req.body.url, (err,response,html) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html)
        const sidebar = $('.sidebar-1')
        const textData = sidebar.text().trim()
        fetch("https://api.fpt.ai/hmi/tts/v5", {
          method: "POST",
          headers: {
            'api_key': 'vympRehHu8icSAJx093nMrGOOx62MA43',
          },
          body: textData,
        })
        .then((response) => response.json())
        .then(jsonData => {
            res.send(jsonData)}
        )
    }
})
})


module.exports = router