const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    url: {type:String}
})

UrlModel = mongoose.model('url', urlSchema)
module.exports = UrlModel