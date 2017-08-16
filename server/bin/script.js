/* eslint-disable max-len */

'use strict';
var DataSource = require('loopback-datasource-juggler').DataSource;

var loopback = require('loopback');
var path = require('path');
var fs = require('fs');
var app = require(path.resolve(__dirname, '../server'));
var outputPath = path.resolve(__dirname, '../../common/models');

var ds = app.dataSources.conexionMyqsl;

function show(err, models) {
  if (err) {
    console.error(err);
  } else {
    console.log(models);
    if (models) {
      models.forEach(function(m) {
        console.dir(m);
      });
    }
  }
}
ds.discoverModelDefinitions({views: true, limit: 20}, show);

ds.discoverModelProperties('dominio', show);

ds.discoverAndBuildModels('dominio', {owner: 'strongloop', visited: {}, associations: true}, function(err, models) {
  for (var m in models) {
    models[m].all(show);
  }
});
