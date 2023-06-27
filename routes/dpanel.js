var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API de Contrataciones' });
});

/**
 * TODO: Mostar datos generales de la BD
 * Listado de colecciones disponibles para consulta
 * Número de elementos en las colecciones
 */

/**
 *  TODO: Agregar colección a listado,
 *  Si la colección está disponible en la BD
 *  => agregar al listado
 */

/**
 * TODO: Borrar colección del listado
 */

/**
 * TODO: Cargar datos a colección
 */


module.exports = router;
