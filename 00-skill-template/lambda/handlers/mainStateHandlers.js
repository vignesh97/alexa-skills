var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');
var alexaMeetups = require("./data/alexaMeetups");
var convertArrayToReadableString = require('./helpers/convertArrayToReadableString');

 var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN,{
   'LaunchRequest' : function(){
     var userName = this.attributes['userName'];
     if(userName)
       {
         this.emit(':ask', `Welcome ${userName}!  You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do? `,'You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do?');
       }
       else{
         this.handler.state = constants.states.ONBOARDING;
         this.emitWithState('NewSession');

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

 },
 'AMAZON.StopIntent' : function(){
   this.emit(':tell','Good Bye');
 },
 'AMAZON.StopIntent' : function(){
   this.emit(':tell','Good Bye');
 },


 'SessionEndedRequest' : function(){
   this.emit(':saveState', true);
 },

 'AMAZON.HelpIntent' : function(){

   this.emit(':ask', ` You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do? `,'You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do?');

 },

 'UnHandled' : function(){
   this.emitWithState('AMAZON.HelpIntent');
 }
 });

 module.exports = mainStateHandlers;
