var request = require('request-promise');

module.exports = {
    GetUserDetails: (accessToken) => {
        return new Promise((resolve, reject) => {


            request({
                url : "https://api.meetup.com/2/member/self?access_token="+accessToken,
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then((response)=>{
                resolve(JSON.parse(response));
            })
            .catch((error)=>{
                reject('Meetup API Error', error);
            });

        });
    },
    GetMeetupgroupDetails:(accessToken, meetupURL)=>{

        return new Promise((resolve,reject) => {
        request({
            url : "https://api.meetup.com/"+meetupURL,
            qs : {
                access_token : accessToken,
                fields : 'next_event,last_event,plain_text_description'
            },
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
                'X-Meta-Photo-Host': 'secure'
            }
        })
        .then((response)=>{
                resolve(JSON.parse(response));
            })
            .catch((error)=>{
                reject('Meetup API Error', error);
            });



    });
    }








};