var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/busqueda', (req, res) => {
    res.json({});
});

//Create (POST)
//Read (GET)
router.get('/contratacion/:id', (req, res) => {
    res.json({});
});

//Update (PUT)
//Delete (DELETE)

module.exports = router;
