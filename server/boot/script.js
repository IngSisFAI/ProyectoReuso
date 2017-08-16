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
    if (models) {
      models.forEach(function(m) {
        console.log(m.name);

        ds.discoverSchema(m.name, {owner: 'taxonomia', visited: {}, associations: true}, schemaCB);
      });
    }
  }
}


function schemaCB(err, schema) {
  if(schema) {
    console.log("Auto discovery success: " + schema.name);
    var outputName = outputPath + '/' +schema.name + '.json';
    fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputName);
      }
    });
  }
  if(err) {
    console.error(err);
    return;
  }
  return;
};


ds.discoverModelDefinitions({owner: 'taxonomia', views: true, limit: 20}, show);

//ds.discoverModelProperties('domino', show);


//function(err, models) {
  // for (var m in models) {
  //  models[m].all(schemaCB);
  //}

