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
},
'AlexaMeetupCityCheck' : function() {
  var USCitySlot = this.event.request.intent.slots.USCity.value;
  var EuropeCitySlot = this.event.request.intent.slots.EuropeCity.value;


  var city;
  if(USCitySlot){
    city=USCitySlot;
  }
  else if (EuropeCitySlot){
    city = EuropeCitySlot;
  }
  else{
    this.emit(':ask',"Sorry I didnt recongnize the city name", "How can I help?")
  }



var cityMatch = "";

for(var i=0;i<alexaMeetups.length;i++){
  if(alexaMeetups[i].city.toLowerCase()=== city.toLowerCase()){
    cityMatch = alexaMeetups[i].city;
  }
}



if(cityMatch !== "")
{
  this.emit(':ask', `Yes  ${city} has an Alexa developer meetup! `, 'How can i help?');
}
else{
  this.emit(':ask', `Sorry, we dont have meetup in your city  ${city}. `, 'How can i help?');
}

}
};
