var Alexa = require('alexa-sdk');


var alexaMeetups = require("./data/alexaMeetups");

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Voice Devs!', 'Try saying hello!');
  },

  'Hello': function () {
    this.emit(':tell', 'Hello Hi there');
  },

'AlexaMeetupNumbers' : function() {
  var meetupNumbers = alexaMeetups.length;
  console.log("meetupNumbers->"+meetupNumbers);
  this.emit(':ask', `There are currently ${meetupNumbers} Alexa developer meetups. Check to see if your city is one of them!`, 'How can i help?');
}
};
