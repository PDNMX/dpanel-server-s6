const mongoose = require('mongoose');
const ReleaseSchema = new mongoose.Schema(
    {
            ocid: String,
            id: String,
            date: String,
            tag: String,
            initiationType: String,
            parties: [{
                    name: String,
                    identifier: {
                            scheme: String,
                            id: String,
                            legalName: String,
                            uri: String
                    },
                    additionalIdentifiers: [{
                            scheme: String,
                            id: String,
                            legalName: String,
                            uri: String
                    }],
                    address: {
                            streetAddress: String,
                            locality: String,
                            region: String,
                            postalCode: String,
                            countryName: String
                    },
                    contactPoint: {
                            name: String,
                            email: String,
                            telephone: String,
                            faxNumber: String,
                            url: String
                    },
                    roles: [ String ]
                    //TODO: details...
            }],
            buyer: {
                    name: String,
                    id: String
            },
            planning: {
                    rationale: String,
                    budget: {
                            id: String,
                            description: String,
                            amount: {
                                    amount: Number,
                                    currency: String
                            },
                            project: String,
                            projectID: String,
                            uri: String
                    },
                    documents: [{
                            id: String,
                            documentType: String,
                            title: String,
                            description: String,
                            url: String,
                            datePublished: String,
                            dateModified: String,
                            format: String,
                            language: String
                    }],
                    milestones: [{
                            id: String,
                            title: String,
                            type: String,
                            description: String,
                            code: String,
                            dueDate: String,
                            dateMet: String,
                            dateModified: String,
                            status: String
                    }]
            },
            tender: {
                    id: String,
                    title: String,
                    description: String,
                    status: String,
                    procuringEntity: {
                            name: String,
                            id: String
                    },
                    items: [{
                            id: String,
                            description: String,
                            classification: {
                                    scheme: String,
                                    id: String,
                                    description: String,
                                    uri: String
                            },
                            additionalClassifications: [{
                                    scheme: String,
                                    id: String,
                                    description: String,
                                    uri: String
                            }],
                            quantity: Number,
                            unit: {
                                    scheme: String,
                                    id: String,
                                    name: String,
                                    value: {
                                            amount: Number,
                                            currency: String
                                    },
                                    uri: String
                            }
                    }],
                    value: {
                            amount: Number,
                            currency: String
                    },
                    minValue: {
                            amount: Number,
                            currency: String
                    },
                    procurementMethod: String,
                    procurementMethodDetails: String,
                    procurementMethodRationale: String,
                    mainProcurementCategory: String,
                    additionalProcurementCategories: [ String ],
                    awardCriteria: String,
                    awardCriteriaDetails: String,
                    submissionMethod: [String],
                    submissionMethodDetails: String,
                    tenderPeriod: {
                            startDate: String,
                            endDate: String,
                            maxExtentDate: String,
                            durationInDays: Number
                    },
                    enquiryPeriod: {
                            startDate: String,
                            endDate: String,
                            maxExtentDate: String,
                            durationInDays: Number
                    },
                    hasEnquiries: Boolean,
                    eligibilityCriteria: String,
                    awardPeriod: {
                            startDate: String,
                            endDate: String,
                            maxExtentDate: String,
                            durationInDays: Number
                    },
                    contractPeriod: {
                            startDate: String,
                            endDate: String,
                            maxExtentDate: String,
                            durationInDays: Number
                    },
                    numberOfTenderers: Number,
                    tenderers: [{
                            name: String,
                            id: String
                    }],
                    documents: [{
                            id: String,
                            documentType: String,
                            title: String,
                            description: String,
                            url: String,
                            datePublished: String,
                            dateModified: String,
                            format: String,
                            language: String
                    }],
                    milestones: [{
                            id: String,
                            title: String,
                            type: String,
                            description: String,
                            code: String,
                            dueDate: String,
                            dateMet: String,
                            dateModified: String,
                            status: String
                    }],
                    amendments: [{
                            date: String,
                            rationale: String,
                            id: String,
                            description: String,
                            amendsReleaseID: String,
                            releaseID: String
                    }]
            },
            awards: [{
                    id: String,
                    title: String,
                    description: String,
                    status: String,
                    date: String,
                    value: {
                            amount: Number,
                            currency: String
                    },
                    suppliers: [{
                            name: String,
                            id: String
                    }],
                    items: [{
                            id: String,
                            description: String,
                            classification: {
                                    scheme: String,
                                    id: String,
                                    description: String,
                                    uri: String
                            },
                            additionalClassifications: [{
                                    scheme: String,
                                    id: String,
                                    description: String,
                                    uri: String
                            }],
                            quantity: Number,
                            unit: {
                                    scheme: String,
                                    id: String,
                                    name: String,
                                    value: {
                                            amount: Number,
                                            currency: String
                                    },
                                    uri: String
                            }
                    }],
                    contractPeriod: {
                            startDate: String,
                            endDate: String,
                            maxExtentDate: String,
                            durationInDays: Number
                    },
                    documents: [{
                            id: String,
                            documentType: String,
                            title: String,
                            description: String,
                            url: String,
                            datePublished: String,
                            dateModified: String,
                            format: String,
                            language: String
                    }],
                    amendments: [{
                            date: String,
                            rationale: String,
                            id: String,
                            description: String,
                            amendsReleaseID: String,
                            releaseID: String
                    }]
            }],
            contracts: [{
                    id: String,
                    awardID: String,
                    title: String,
                    description: String,
                    status: String,
                    period: {
                            startDate: String,
                            endDate: String,
                            maxExtentDate: String,
                            durationInDays: Number
                    },
                    value: {
                            amount: Number,
                            currency: String
                    },
                    items: [{
                            id: String,
                            description: String,
                            classification: {
                                    scheme: String,
                                    id: String,
                                    description: String,
                                    uri: String
                            },
                            additionalClassifications: [{
                                    scheme: String,
                                    id: String,
                                    description: String,
                                    uri: String
                            }],
                            quantity: Number,
                            unit: {
                                    scheme: String,
                                    id: String,
                                    name: String,
                                    value: {
                                            amount: Number,
                                            currency: String
                                    },
                                    uri: String
                            }
                    }],
                    dateSigned: String,
                    documents: [{
                            id: String,
                            documentType: String,
                            title: String,
                            description: String,
                            url: String,
                            datePublished: String,
                            dateModified: String,
                            format: String,
                            language: String
                    }],
                    implementation: {
                            transactions: [{
                                    id: String,
                                    source: String,
                                    date: String,
                                    value: {
                                            amount: Number,
                                            currency: String
                                    },
                                    payer: {
                                            name: String,
                                            id: String
                                    },
                                    payee: {
                                            name: String,
                                            id: String
                                    },
                                    uri: String
                            }],
                            milestones: [{
                                    id: String,
                                    title: String,
                                    type: String,
                                    description: String,
                                    code: String,
                                    dueDate: String,
                                    dateMet: String,
                                    dateModified: String,
                                    status: String
                            }],
                            documents: [{
                                    id: String,
                                    documentType: String,
                                    title: String,
                                    description: String,
                                    url: String,
                                    datePublished: String,
                                    dateModified: String,
                                    format: String,
                                    language: String
                            }]
                    },
                    relatedProcesses: [{
                            id: String,
                            relationship: [String],
                            title: String,
                            scheme: String,
                            identifier: String,
                            uri: String
                    }],
                    milestones: [{
                            id: String,
                            title: String,
                            type: String,
                            description: String,
                            code: String,
                            dueDate: String,
                            dateMet: String,
                            dateModified: String,
                            status: String
                    }],
                    amendments: [{
                            date: String,
                            rationale: String,
                            id: String,
                            description: String,
                            amendsReleaseID: String,
                            releaseID: String
                    }]
            }],
            language: String,
            relatedProcesses: [{
                    id: String,
                    relationship: [String],
                    title: String,
                    scheme: String,
                    identifier: String,
                    uri: String
            }]
    }
);

module.exports = {ReleaseSchema};
