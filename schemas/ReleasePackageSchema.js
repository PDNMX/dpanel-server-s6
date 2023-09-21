const mongoose = require('mongoose');
const { ReleaseDefinition} = require("./ReleaseSchema");

const ReleasePackageSchema = new mongoose.Schema({
    uri: String,
    version: String,
    extensions: [ String ],
    publishedDate: String,
    releases: [ ReleaseDefinition ],
    publisher: {
        name,
        scheme: String,
        uid: String,
        uri: String
    },
    license: String,
    publicationPolicy: String
});

module.exports = { ReleasePackageSchema };
