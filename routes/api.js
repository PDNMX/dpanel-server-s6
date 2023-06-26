var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const {ReleaseSchema} = require('../schemas/ReleaseSchema');

/*
const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/edca');
}
main().catch(err => console.log(err));
*/

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        version: 1.0,
        title: 'API de Contrataciones'
    });
});

router.post('/busqueda', (req, res) => {
    res.json({});
});

// Create (POST)

// Read (GET)
router.get('/contratacion/:id', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/edca');
    const Release = mongoose.model('apf_releases', ReleaseSchema);
    const Releases = await Release.findOne();
    //console.log(Releases)
    res.json(Releases);
});

// Update (PUT)
// Delete (DELETE)

module.exports = router;
