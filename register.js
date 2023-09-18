/**
 * Script para administrar usuarios
 */
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const {conn_uri, users_collection} = require('./DbSettings');
const mongoose = require('mongoose');
const {UserSchema} = require('./schemas/UserSchema');
const {argv}  = require('node:process');
const { program } = require('commander');

program.requiredOption('-e, --email <email>', 'Debe especificar un email');
program.requiredOption('-p, --password <Contraseña>', 'Debe especificar una constraseña');
program.requiredOption('-n, --name <Nombre completo>', 'Debe especificar el nombre del usuario, por ejemplo, Juan Perez');

program.parse();

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

const {name, email, password } = program.opts();

register_user({name, email, password}).then( result => {
    console.log(result);
});

