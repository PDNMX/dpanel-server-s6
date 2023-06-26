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

router.post('/busqueda', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/edca');
    const Release = mongoose.model('apf_releases', ReleaseSchema);
    const {page, pageSize} = req.body;
    const _page_ = page > 0 ? page : 1;
    const _pageSize_ = pageSize > 0 && pageSize <= 200 ? pageSize: 10;
    const skip = ((_page_ - 1) * _pageSize_);
    /* TODO: query */
    const results = await Release.find().limit(_pageSize_).skip(skip);

    res.json({
        pagination: {
          page : _page_,
          pageSize : _pageSize_
        },
        results: results
    });
});

// Create (POST)
// Read (GET)
router.get('/contratacion/:ocid', async (req, res) => {
    const {ocid} = req.params; // e.g., ocds-07smqs-1775500
    await mongoose.connect('mongodb://127.0.0.1:27017/edca');
    const Release = mongoose.model('apf_releases', ReleaseSchema);
    const Result = await Release.findOne({ocid: ocid});
    //console.log(Releases)
    res.json(Result);
});
// Update (PUT)
// Delete (DELETE)

module.exports = router;
