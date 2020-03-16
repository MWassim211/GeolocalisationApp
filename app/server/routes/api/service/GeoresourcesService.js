'use strict';


/**
 * Get all living resources
 * Returns an array containing the representations of all existing resources in the game if the user is alive, or only that of the user if she is dead
 *
 * returns List
 **/
exports.resourcesGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "role" : "infected",
  "id" : "toto",
  "position" : "",
  "ttl" : 0,
  "url" : "http://example.com/users/toto/avatar.png",
  "blurred" : true,
  "status" : "alive",
  "trophys" : [ {
    "action" : "infected",
    "id" : ""
  }, {
    "action" : "infected",
    "id" : ""
  } ]
}, {
  "role" : "infected",
  "id" : "toto",
  "position" : "",
  "ttl" : 0,
  "url" : "http://example.com/users/toto/avatar.png",
  "blurred" : true,
  "status" : "alive",
  "trophys" : [ {
    "action" : "infected",
    "id" : ""
  }, {
    "action" : "infected",
    "id" : ""
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * (re)set user's image URL
 * Sets or updates the user's photo/icon/... image file URL
 *
 * resourceId String User's login
 * url String 
 * no response value expected for this operation
 **/
exports.resourcesResourceIdImagePUT = function(resourceId,url) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update user's position
 * Send a LatLng object to the server.
 *
 * resourceId String User's login
 * position LatLng User's position
 * no response value expected for this operation
 **/
exports.resourcesResourceIdPositionPUT = function(resourceId,position) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

