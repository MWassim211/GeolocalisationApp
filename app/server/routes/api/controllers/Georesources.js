'use strict';

var utils = require('../utils/writer.js');
var Georesources = require('../service/GeoresourcesService');

module.exports.resourcesGET = function resourcesGET (req, res, next) {
  Georesources.resourcesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.resourcesResourceIdImagePUT = function resourcesResourceIdImagePUT (req, res, next) {
  var resourceId = req.swagger.params['resourceId'].value;
  var url = req.swagger.params['url'].value;
  Georesources.resourcesResourceIdImagePUT(resourceId,url)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.resourcesResourceIdPositionPUT = function resourcesResourceIdPositionPUT (req, res, next) {
  var resourceId = req.swagger.params['resourceId'].value;
  var position = req.swagger.params['position'].value;
  Georesources.resourcesResourceIdPositionPUT(resourceId,position)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
