const host = process.env.MONGODB_HOST || 'localhost';
const port = process.env.MONGODB_PORT || 27017;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME || 'contrataciones';

let credentials = '';

if (typeof user !== 'undefined' && user !== '') {
    credentials = `${user}:${password}@`;
}
const conn_uri = `mongodb://${credentials}${host}:${port}/${dbName}?authSource=admin`;
//console.log(url);

const client_options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const releases_collection = process.env.MONGODB_COLLECTION_RELEASES || 'apf_releases';
const packages_collection = process.env.MONGODB_COLLECTION_PACKAGES || 'apf_packages';
const users_collection = process.env.MONGODB_COLLECTION_USERS || 'users_collection';

module.exports = {
    conn_uri,
    client_options,
    packages_collection,
    releases_collection,
    users_collection
};
