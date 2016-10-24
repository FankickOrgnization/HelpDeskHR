'use strict';
var request = require('request');
//console.log("------:thread:-----");

const persistentMenu = (accessToken) => {
  console.log("accessToken for thread:-----", accessToken);
  var body = {
              "setting_type" : "call_to_actions",
              "thread_state" : "existing_thread",
              "call_to_actions":[
                {
                  "type":"postback",
                  "title":"Help",
                  "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_HELP"
                },
                {
                  "type":"postback",
                  "title":"Choose Categories",
                  "payload":"Categories"
                },
                {
                  "type":"web_url",
                  "title":"Download HR-HelpDesk App",
                  "url":"http://google.com/"
                }
              ]
            };
  request({
      uri: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token='+ accessToken,
      headers: {
          "Content-Type": "application/json"
      },
      method: 'POST',
      json: body
  }, function(error, response) {
      if (error) {
          console.log("Error While geting response from Wit:", error);
      } else {
        console.log("Success While geting response from facebook thread:",response.body);
      }
  });
};


// const fbuserdetails = (event, userid) => {
//
//
// };


module.exports = {
  persistentMenu: persistentMenu
};
