var Alexa = require('alexa-sdk');


var alexaMeetups = require("./data/alexaMeetups");

var convertArrayToReadableString = require('./helpers/convertArrayToReadableString')
exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

'NewSession' : function(){
  this.emit(":ask", "Welcome to Voice Devs, The skill that gives you information about the alexa developer community. But first, I like to get the know you better. Tell me your name by Saying My is name and your name",'Tell me your name by saying My is name and your name');
},

'NameCapture' : function(){
  var USFirstNameSlot = this.event.request.intent.slots.USFirstName.value;
  var UKFirstNameSlot = this.event.request.intent.slots.UKFirstName.value;

var name;
if(USFirstNameSlot){
  name = USFirstNameSlot;
}
else if (UKFirstNameSlot){
 name = UKFirstNameSlot;
}


  if(name){
    this.attributes['userName'] = name;
    this.emit(':ask', `OK ${name}! Tell me what country you are from by saying: I'm from, and then the country you're from.`,'Tell me what country you are from by saying: I am from, and then the country you are from.');
  }
  else{
    this.emit(':ask',"Sorry I didnt recognize that name", 'Please tell me your name');
  }



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
,
'AlexaMeetupOrganiserCheck' : function() {
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
var cityOrganizers;

for(var i=0;i<alexaMeetups.length;i++){
  if(alexaMeetups[i].city.toLowerCase()=== city.toLowerCase()){
    cityMatch = alexaMeetups[i].city;
    cityOrganizers = alexaMeetups[i].organisers;
  }
}

if(cityMatch !== "")
{
  if(cityOrganizers.length ===1){
    this.emit(':ask', `The organizer of the   ${city}  Alexa developer meetup is ${cityOrganizers[0]}! `, 'How can i help?');
  }
  else {

      this.emit(':ask', `The organizer of the   ${city}  Alexa developer meetup are  ${convertArrayToReadableString(cityOrganizers)}! `, 'How can i help?');
    }


}
else{
  this.emit(':ask', `Sorry, we dont have meetup in your city  ${city}. `, 'How can i help?');
}

}



};
