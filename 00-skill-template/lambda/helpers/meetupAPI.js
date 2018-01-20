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
    }
};