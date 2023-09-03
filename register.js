/**
 * Script para administrar usuarios
 */
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const {conn_uri, users_collection} = require('./DbSettings');
const mongoose = require('mongoose');
const {UserSchema} = require('./schemas/UserSchema');

const register_user = async ({name, email, password}) => {
    await mongoose.connect(conn_uri);
    const User = mongoose.model(users_collection, UserSchema);

    const hash = await bcrypt.hash(password, 10);
    const new_user = new User ({
        name,
        email,
        password: hash
    });

    const result = await new_user.save();
    await mongoose.disconnect();
    return result;
}

const test1 = {
    name: "Test Name 1",
    email: "Example email 1",
    password: "Test pass"
};

register_user(test1).then( result => {
    console.log(result);
})

