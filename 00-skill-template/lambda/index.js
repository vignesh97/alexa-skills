var Alexa = require('alexa-sdk');

console.log("test1");

var constants = require('./constants/constants');
console.log("test2");
var onboardingStateHandlers = require("./handlers/onboardingStateHandlers");
console.log("test3");
var mainStateHandlers =  require("./handlers/mainStateHandlers");

console.log("test4");

exports.handler = function(event, context, callback){
  console.log("test5");
  var alexa = Alexa.handler(event, context);
  console.log('appId:'+constants.appId);
  console.log('DBName:'+constants.dynamoDBTableName);

  alexa.appId = constants.appId;

  alexa.dynamoDBTableName = constants.dynamoDBTableName;
  alexa.registerHandlers(
    onboardingStateHandlers,
    mainStateHandlers);
  alexa.execute();
};
