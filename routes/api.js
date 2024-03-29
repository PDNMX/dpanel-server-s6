var express = require('express');
var router = express.Router();
const _ = require('lodash');
const {conn_uri, packages_collection, releases_collection, users_collection} = require('../DbSettings');
const mongoose = require('mongoose');
const {ReleaseSchema} = require('../schemas/ReleaseSchema');
const {UserSchema} = require('../schemas/UserSchema');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {ReleasePackageSchema} = require("../schemas/ReleasePackageSchema");

const verifyUserToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};

router.post('/token', async (req, res) => {
    const user = req.body;
    await mongoose.connect(conn_uri);
    const User = mongoose.model(users_collection, UserSchema);
    const foundUser = await User.findOne({email: user.email});
    if (foundUser){

        const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);

        if (!isPasswordValid){
            //send error
            res.status(400).json({
                status: "error",
                message: "Contraseña incorrecta"
            });

        } else {
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_TOKEN_EXPIRES_IN || '1h' });
            res.json({
                status: "ok",
                message: "Token generado exitosamente",
                token
            });
        }
    } else {
        res.status(400).json({
            status: "Error",
            message: "No se encontró al usuario en la base de datos"
        });
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        version: 1.0,
        title: 'API de Contrataciones'
    });
});

router.post('/busqueda', verifyUserToken, async (req, res) => {
    await mongoose.connect(conn_uri);
    const Release = mongoose.model(releases_collection, ReleaseSchema);
    const {page, pageSize} = req.body;
    const _page_ = page > 0 ? page : 1;
    const _pageSize_ = pageSize > 0 && pageSize <= 200 ? pageSize: 10;
    const skip = ((_page_ - 1) * _pageSize_);

    /**
     * QUERY OPTIONS
     * ocid
     * title => tender.title, awards.title, contracts.title
     * buyerName => buyer.name, parties.name where roles contains "buyer"
     * procurementMethod: [open, direct, selective, other]
     * awardStatus => awards.status: [active, pending, cancelled, unsuccessful]
     * supplierName => awards.suppliers.name, parties.name where roles contains "tenderer"
     * tenderStartDate => tender.tenderPeriod.startDate
     * tenderEndDate => tender.tenderPeriod.endDate
     * itemDescription => awards.items.description, tender.items.description
     * numberOfTenderers => tender.numberOfTenderers
     **/

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

    /**
     * SORT OPTIONS
     * title, buyer.name => asc, desc
     */
    const {sort} = req.body;

    //console.log(JSON.stringify(_query_));
    const totalRows = await Release.countDocuments(_query_);
    let results;

    if (sort && typeof sort !== 'undefined' && ( _.has(sort, "title") || _.has(sort, "buyerName") )){
        let _sort_ = {};

        if (_.has(sort, "title") ){
            sort.title.toLowerCase() === "desc" ? _sort_.title = -1 : 1;
        }

        if (_.has(sort, "buyerName")){
            sort.buyerName.toLowerCase() === "desc" ? _sort_.title = -1 : 1;
        }

        results = await Release.find(_query_).sort(_sort_).limit(_pageSize_).skip(skip);
    } else {
        results = await Release.find(_query_).limit(_pageSize_).skip(skip);
    }

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
router.get('/release/:ocid', verifyUserToken, async (req, res) => {
    const {ocid} = req.params; // e.g., ocds-07smqs-1775500
    await mongoose.connect(conn_uri);
    const Release = mongoose.model(releases_collection, ReleaseSchema);
    const Result = await Release.findOne({ocid: ocid});

    if (Result){
        res.json({
            status: "ok",
            releasePackage: Result
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "No se encontró el registro"
        });
    }
});

router.get('/releasepackage/:ocid', verifyUserToken, async (req, res) => {
    const {ocid} = req.params;
    await mongoose.connect(conn_uri);
    const ReleasePackage = mongoose.model(packages_collection, ReleasePackageSchema);
    const Result = await ReleasePackage.findOne({"releases.ocid": ocid});

    if (Result){
        res.json({
            status: "ok",
            releasePackage: Result
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "No se encontró el registro"
        });
    }
});

// Update (PUT)
// Delete (DELETE)

module.exports = router;
