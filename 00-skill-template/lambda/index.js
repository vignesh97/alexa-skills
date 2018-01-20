var Alexa = require('alexa-sdk');



var constants = require('./constants/constants');
var onboardingStateHandlers = require("./handlers/onboardingStateHandlers");
var mainStateHandlers =  require("./handlers/mainStateHandlers");



exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  console.log('appId:'+constants.appId);
  console.log('DBName:'+constants.dynamoDBTableName);

  alexa.appId = constants.appId;

  alexa.dynamoDBTableName = constants.dynamoDBTableName;
  alexa.registerHandlers(onboardingStateHandlers,mainStateHandlers);
  alexa.execute();
};
