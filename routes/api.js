var express = require('express');
var router = express.Router();

const _ = require('lodash');

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

    /** TODO sort => title, buyer.name => asc, desc
     const {sort} = req.body;
     */

    /*
    Query Options:
    ocid
    title => tender.title, awards.title, contracts.title
    buyerName => buyer.name, parties.name where roles contains "buyer"
    procurementMethod: [open, direct, selective, other]
    awardStatus => awards.status: [active, pending, cancelled, unsuccessful]
    supplierName => awards.suppliers.name, parties.name where roles contains "tenderer"
    tenderStartDate => tender.tenderPeriod.startDate
    tenderEndDate => tender.tenderPeriod.endDate
    itemDescription => awards.items.description, tender.items.description
    numberOfTenderers => tender.numberOfTenderers
    */
    const {
        ocid, title, buyerName, procurementMethod, awardStatus, supplierName,
        tenderStartDate, tenderEndDate, itemDescription, numberOfTenderers
    } = req.body.query || {};

    let _query_ = {};

    if (ocid && ocid !== ""){
        _query_.$and = [{ocid: { $regex:  ocid, $options: 'i'}}];
    }

    if (title && title !== ""){
        const title_or = {$or: [
                {"tender.title" : {$regex: title, $options: "i"}},
                {"awards.title" : {$regex: title, $options: "i"}},
                {"contracts.title" : {$regex: title, $options: "i"}}
            ]};

        if (_.has(_query_,"$and")){
            _query_.$and.push(title_or);
        } else {
            _query_.$and = [ title_or ];
        }
    }

    if (buyerName && buyerName !== ""){
        const buyerName_or = {$or: [
                {"buyer.name": { $regex: buyerName , $options: "i"}},
                {"parties.name": { $regex: buyerName, $options: "i"}, "parties.roles": { $in: [ "buyer" ]}}
            ]};

        if (_.has(_query_,"$and")){
            _query_.$and.push(buyerName_or);
        } else {
            _query_.$and = [ buyerName_or ];
        }
    }

    if (procurementMethod && Array.isArray(procurementMethod)){

        let pm_or = {$or: []};
        for (const pm of procurementMethod){
            switch (pm){
                case "open":
                    pm_or.$or.push({"tender.procurementMethod": "open"}); //$regex?
                    break;
                case "selective":
                    pm_or.$or.push({"tender.procurementMethod": "selective"});
                    break;
                case "limited":
                    pm_or.$or.push({"tender.procurementMethod": "limited"});
                    break;
                case "direct":
                    pm_or.$or.push({"tender.procurementMethod": "direct"});
                    break;
            }
        }

        if (pm_or.$or.length > 0){
            if (_.has(_query_,"$and")){
                _query_.$and.push(pm_or);
            } else {
                _query_.$and = [ pm_or ];
            }
        }
    }

    if (awardStatus && Array.isArray(awardStatus)){
        let aws_or = {$or: []};

        for (const a of awardStatus){
            switch (a){
                case "pending":
                    aws_or.$or.push({"awards.status": "pending"});
                    break;
                case "active":
                    aws_or.$or.push({"awards.status": "active"});
                    break;
                case "cancelled":
                    aws_or.$or.push({"awards.status": "cancelled"})
                    break;
                case "unsuccessful":
                    aws_or.$or.push({"awards.status": "unsuccessful"});
                    break;
            }
        }

        if (_.has(_query_,"$and")){
            _query_.$and.push(aws_or);
        } else {
            _query_.$and = [ aws_or ];
        }
    }

    if (supplierName && supplierName !== ""){
        const supplierName_or = {$or: [
                {"tender.suppliers.name": { $regex: supplierName , $options: "i"}},
                {"parties.name": { $regex: supplierName, $options: "i"}, "parties.roles": { $in: [ "supplier" ]}}
            ]};

        if (_.has(_query_,"$and")){
            _query_.$and.push(supplierName_or);
        } else {
            _query_.$and = [ supplierName_or ];
        }
    }

    if (tenderStartDate && tenderStartDate !== ""){
        if (_.has(_query_,"$and")){
            _query_.$and.push({
                "tender.tenderPeriod.startDate": { $gte: tenderStartDate }
            });
        } else {
            _query_.$and = [ {"tender.tenderPeriod.startDate": { $gte: tenderStartDate }} ];
        }
    }

    if (tenderEndDate && tenderEndDate !== ""){
        if (_.has(_query_,"$and")){
            _query_.$and.push({
                "tender.tenderPeriod.endDate": { $gte: tenderStartDate }
            });
        } else {
            _query_.$and = [ {"tender.tenderPeriod.endDate": { $gte: tenderStartDate }} ];
        }
    }

    if (itemDescription && itemDescription !== ""){
        const itemDescription_or = {$or: [
                {"tender.items.description": {$regex: itemDescription, $options: "i"}},
                {"awards.items.description": {$regex: itemDescription, $options: "i"}}
            ]};

        if (_.has(_query_,"$and")){
            _query_.$and.push(itemDescription_or);
        } else {
            _query_.$and = [ itemDescription_or ];
        }
    }

    if (numberOfTenderers && !isNaN(numberOfTenderers)){
        if (_.has(_query_,"$and")){
            _query_.$and.push({numberOfTenderers: numberOfTenderers});
        } else {
            _query_.$and = [ {numberOfTenderers: numberOfTenderers} ];
        }
    }

    const totalRows = await Release.countDocuments(_query_);
    const results = await Release.find(_query_).limit(_pageSize_).skip(skip);

    res.json({
        pagination: {
            page : _page_,
            pageSize : _pageSize_,
            totalRows: totalRows
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
