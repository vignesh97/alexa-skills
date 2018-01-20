var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');
var alexaMeetups = require("../data/alexaMeetups");
var convertArrayToReadableString = require('../helpers/convertArrayToReadableString');
var meetupAPI = require('../helpers/meetupAPI');


var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {
    'LaunchRequest': function() {
        var userName = this.attributes['userName'];
        if (userName) {
            this.emit(':ask', `Welcome ${userName}!  You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do? `, 'You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do?');
        } else {
            this.handler.state = constants.states.ONBOARDING;
            this.emitWithState('NewSession');

        }
    },


    'AlexaMeetupNumbers': function() {
        var meetupNumbers = alexaMeetups.length;
        console.log("meetupNumbers->" + meetupNumbers);
        this.emit(':ask', `There are currently ${meetupNumbers} Alexa developer meetups. Check to see if your city is one of them!`, 'How can i help?');
    },
    'AlexaMeetupCityCheck': function() {
        var USCitySlot = this.event.request.intent.slots.USCity.value;
        var EuropeCitySlot = this.event.request.intent.slots.EuropeCity.value;
        var city;
        if (USCitySlot) {
            city = USCitySlot;
        } else if (EuropeCitySlot) {
            city = EuropeCitySlot;
        } else {
            this.emit(':ask', 'Sorry I didnt recongnize the city name', 'How can I help?');
        }
        var cityMatch = "";
        for (var i = 0; i < alexaMeetups.length; i++) {
            if (alexaMeetups[i].city.toLowerCase() === city.toLowerCase()) {
                cityMatch = alexaMeetups[i].city;
            }
        }

        if (cityMatch !== "") {
            this.emit(':ask', `Yes  ${city} has an Alexa developer meetup! `, 'How can i help?');
        } else {
            this.emit(':ask', `Sorry, we dont have meetup in your city  ${city}. `, 'How can i help?');
        }
    },


    'AlexaMeetupOrganiserCheck': function() {
        var USCitySlot = this.event.request.intent.slots.USCity.value;
        var EuropeCitySlot = this.event.request.intent.slots.EuropeCity.value;
        var city;
        if (USCitySlot) {
            city = USCitySlot;
        } else if (EuropeCitySlot) {
            city = EuropeCitySlot;
        } else {
            this.emit(':ask', "Sorry I didnt recongnize the city name", "How can I help?");
        }

        var cityMatch = "";
        var cityMeetupRL="";
        for (var i = 0; i < alexaMeetups.length; i++) {
            if (alexaMeetups[i].city.toLowerCase() === city.toLowerCase()) {
                cityMatch = alexaMeetups[i].city;
                cityMeetupRL = alexaMeetups[i].meetupURL;
            }
        }

        if (cityMatch !== "") {
            var accessToken= this.event.session.user.accessToken;
            if(accessToken){


                meetupAPI.GetMeetupgroupDetails(accessToken,cityMeetupRL)
                .then((meetupDetails)=>{
                    console.log(JSON.stringify(meetupDetails));
                    var organizerName = meetupDetails.organizer.name;

                    var cardTitle = `${organizerName}`;
                    var cardContent = `The organizer of the   ${city}  Alexa developer meetup is ${organizerName}! `;
                    var imageObj = {
                        smallImageUrl : `${meetupDetails.organizer.photo.photo_link}`,
                         largeImageUrl : `${meetupDetails.organizer.photo.photo_link}`
                    };

                                    this.emit(':askWithCard', `The organizer of the   ${city}  Alexa developer meetup is ${organizerName}!. I have sent info to your alexa app`, 'How can i help?', cardTitle,cardContent, imageObj);

                }).catch((error)=>{
                    console.log("Meetup API Error:", error);
                    this.emit(':tell', 'Something went wrong');
                });
            }
        

        } else {
            this.emit(':ask', `Sorry, we dont have meetup in your city  ${city}. `, 'How can i help?');
        }

    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', 'Good Bye');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', 'Good Bye');
    },


    'SessionEndedRequest': function() {
        this.emit(':saveState', true);
    },

    'AMAZON.HelpIntent': function() {
console.log("Main Help Intent");
        this.emit(':ask', 'You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do? ', 'You can ask me various alexa meetups around the world, or listen to the Alexa Dev Podcast. What do you like to do?');

    },

    'UnHandled': function() {
        console.log("Main UnHandled");
        this.emitWithState('AMAZON.HelpIntent');
    }
});

module.exports = mainStateHandlers;
