var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');


 var onboardingStateHandlers = Alexa.CreateStateHandler(constants.states.ONBOARDING,{


   'NewSession' : function(){
       var userName = this.attributes['userName'];
       if(userName)
         {

           this.handler.state = constants.states.MAIN;
           this.emitWithState('LaunchRequest');

         }
         else{
           this.emit(":ask", "Welcome to Voice Devs, The skill that gives you information about the alexa developer community. But first, I like to get the know you better. Tell me your name by Saying My is name and your name",'Tell me your name by saying My is name and your name');
         }

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
       this.emit(':ask',"Sorry I didnt recognize that name. Please say again by saying, My name is and your name ", ' Please say your name by saying, My name is and your name' );
     }



   },

   //Save name and country to the session object
   'CountryCapture' : function() {
     var country = this.event.request.intent.slots.CountryName.value;

     var userName = this.attributes['userName'];

   if(country){
     this.attributes['userCountry'] = country;

     this.handler.state = constants.states.MAIN;

     this.emit(':ask', `Ok ${userName}! Your from ${country}, that's great! You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do? `,'You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do?');
   }else{
     this.emit(':ask', `Sorry!, I did not recongnize that!. Please Tell me what country you are from by saying: I'm from, and then the country name`,'Tell me what country you are from by saying: I am from, and then the country name');
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
     this.emit(':tell','Good Bye');

     var userName = this.attributes['userName'];
     if(userName)
       {

         this.emit(':ask', `OK ${name}! Tell me what country you are from by saying: I'm from, and then the country you're from.`,'Tell me what country you are from by saying: I am from, and then the country you are from.');
       }else{
         this.emit(':ask',"Sorry I didnt recognize that name. Please say again by saying, My name is and your name ", ' Please say your name by saying, My name is and your name' );

       }

   },

   'UnHandled' : function(){
     this.emitWithState('AMAZON.HelpIntent');
   }


 });

 module.exports = onboardingStateHandlers;
