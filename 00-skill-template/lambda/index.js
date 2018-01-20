var Alexa = require('alexa-sdk');



var constants = require('../constants/constants');
var onboardingStateHandlers = require("./handlers/onboardingStateHandlers");
var mainStateHandlers =  require("./handlers/mainStateHandlers");



exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.dynamoDBTableName = "VoiceDevUsers";
  alexa.registerHandlers(handlers);
  alexa.execute();
};
