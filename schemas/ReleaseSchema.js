const mongoose = require('mongoose');

const ReleaseDefinition = {
        ocid: String,
        id: String,
        date: String,
        tag: String,
        initiationType: String,
        parties: [{
                name: String,
                id: String,
                position: String, //Extensión: Junta de aclaraciones
                identifier: {
                        legalPersonality: String, //Extensión: junta de aclaraciones
                        scheme: String,
                        id: String,
                        legalName: String,
                        givenName: String, //Extensión: Desglose del nombre
                        patronymicName: String, //Extensión: Desglose del nombre
                        matronymicName: String, //Extensión: Desglose del nombre
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
                        type: String,
                        name: String,
                        givenName: String, //Extensión: Desglose del nombre
                        patronymicName: String, //Extensión: Desglose del nombre
                        matronymicName: String, //Extensión: Desglose del nombre
                        email: String,
                        telephone: String,
                        faxNumber: String,
                        url: String,
                        availableLanguage: [ String ] //Extensión: puntos de contacto adicionales
                },
                additionalContactPoints: [{ // Extensión: Puntos de contacto adicionales
                        type: String, // Extensión: Tipo de punto de contacto
                        name: String,
                        givenName: String, //Extensión: Desglose del nombre
                        patronymicName: String, //Extensión: Desglose del nombre
                        matronymicName: String, //Extensión: Desglose del nombre
                        email: String,
                        telephone: String,
                        faxNumber: String,
                        url: String,
                        availableLanguage: String
                }],
                roles: [ String ],
                memberOf: [{ // Extensión: Miembro de
                        id: String,
                        name: String
                }],
                beneficialOwners: [{ //Extensión: Beneficial Owners
                        id: String,
                        name: String,
                        identifier: {
                                scheme: String,
                                id: String
                        },
                        nationality: String,
                        address: {
                                streetAddress: String,
                                locality: String,
                                region: String,
                                postalCode: String,
                                countryName: String,
                                email: String,
                                faxNumber: String,
                                telephone: String,
                                details: {
                                        listedOnRegulatedMarket: Boolean
                                }
                        }

                }]
        }],
        buyer: {
                name: String,
                id: String
        },
        planning: {
                rationale: String,
                hasQuotes: String, //Extensión: Solicitud de cotizaciones
                requestingUnits: [{ //Extensión: Unidades de adquisiciones
                        name: String,
                        id: String,
                }],
                responsibleUnits: [{
                        name: String,
                        id: String,
                }],
                contractingUnits: [{
                        id: String,
                        name: String
                }],
                requestForQuotes: [{
                        id: String,
                        title: String,
                        description: String,
                        period: {
                                startDate: String,
                                endDate: String,
                                maxExtentDate: String,
                                durationInDays: Number //Integer
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
                                                currency: String,
                                                amount: Number
                                        },
                                        uri: String
                                }
                        }],
                        invitedSuppliers: [{
                                name: String,
                                id: String
                        }],
                        quotes: [{
                                id: String,
                                description: String,
                                date: String,
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
                                                        currency: String,
                                                        amount: Number
                                                },
                                                uri: String
                                        }
                                }],
                                value: {
                                        amount: Number,
                                        currency: String
                                },
                                period: {
                                        startDate: String,
                                        endDate: String,
                                        maxExtentDate: String,
                                        durationInDays: Number // int
                                },
                                issuingSupplier: {
                                        name: String,
                                        id: String
                                }
                        }]
                }],
                budget: {
                        id: String,
                        description: String,
                        amount: {
                                amount: Number,
                                currency: String
                        },
                        project: String,
                        projectID: String,
                        uri: String,
                        budgetBreakdown: { // Extensión: Budget breakdown
                                id: String,
                                description: String,
                                value: {
                                        amount: Number,
                                        currency: String
                                },
                                uri: String,
                                period: {
                                        startDate: String,
                                        endDate: String,
                                        maxExtentDate: String,
                                        durationInDays: Number // int
                                },
                                budgetLines: [{
                                        id: String,
                                        origin: String,
                                        components: [{
                                                name: String,
                                                level: String,
                                                code: String,
                                                description: String
                                        }]
                                }],
                                sourceParty: {
                                        name: String,
                                        id: String
                                }
                        }
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
                                        amountNet:Number, //Extension: Impuestos
                                        currency: String,
                                },
                                uri: String,
                                deliveryLocation: { //Extensión: Ubicación
                                        geometry: {
                                                type: String,
                                                coordinates: [ Number ]
                                        },
                                        gazetter:{
                                                scheme: String,
                                                identifiers: [ String ],
                                                description: String,
                                                uri: String
                                        }
                                },
                                deliveryAddress: {
                                        streetAddress: String,
                                        locality: String,
                                        region: String,
                                        postalCode: String,
                                        countryName: String
                                }
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
                clarificationMeetings: { // Extensión: Juntas de aclaraciones
                        id: String,
                        date: String,
                        attendees: [{
                                name: String,
                                id: String
                        }],
                        officials: [{
                                name: String,
                                id: String
                        }]
                },
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
                rationale: String, // Extensión: Justificación de la adjudicación
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
                        amountNet: Number, // Extensión: Impuestos
                        currency: String,
                        exchangeRates: [{
                                rate: Number,
                                currency: String,
                                date: String,
                                source: String
                        }]
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
                                uri: String,
                                deliveryLocation: { //Extensión: Ubicación
                                        geometry: {
                                                type: String,
                                                coordinates: [ Number ]
                                        },
                                        gazetter:{
                                                scheme: String,
                                                identifiers: [ String ],
                                                description: String,
                                                uri: String
                                        }
                                },
                                deliveryAddress: {
                                        streetAddress: String,
                                        locality: String,
                                        region: String,
                                        postalCode: String,
                                        countryName: String
                                }
                        }
                }],
                dateSigned: String,
                surveillanceMechanisms: [String], // Extensión: Mecanismos de vigilancia
                guarantees: { //Extensión: Garantías
                        id: String,
                        type: String,
                        date: String,
                        obligations: String,
                        value: {
                                amount: Number,
                                currency: String
                        },
                        guarantor: {
                                name: String,
                                id: String
                        },
                        period: {
                                startDate: String,
                                endDate: String,
                                maxExtentDate: String,
                                durationInDays: Number
                        }
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
                implementation: {
                        status: String, // Extensión: Estatus de la ejecución
                        transactions: [{
                                id: String,
                                source: String,
                                date: String,
                                paymentMethod: String, // Extensión: Método de pago
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
};

const ReleaseSchema = new mongoose.Schema(
 ReleaseDefinition
);

module.exports = {ReleaseSchema, ReleaseDefinition};
