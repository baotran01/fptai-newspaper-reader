const request = require('request')
const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')


router.post('/', (req,res) => {
    request(req.body.url, (err,response,html) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html)
        const sidebar = $('.sidebar-1')
        const textData = sidebar.text()
        res.send(textData.trim())
    }
})
})


module.exports = router