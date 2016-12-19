'use strict';
var request = require('request');
//const searchText = require('./search.js');
const thread = require('./thread.js');
//var app = express();
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 2,
    host: 'ap-cdbr-azure-southeast-a.cloudapp.net',
    user: 'bb603e8108da6e',
    password: '3e384329',
    database: 'rankworlddev'
});
var fbpage_access_token = 'EAAP946SZAFSABAOdfz6BR3ReQ3L7eBRlZCdUOTLgPsEzDk8JChwSPdFZAaliRqbBeA4PubeQ6mwBCcV7xLOhydsZBKtCxrZAsyZCvb2QogaUZCLAvWDujqGllYAh4eW1sUZAsqLo2lEb29jtgdURZAeZCIarXGTLo46xJau48BOZC94rgZDZD';
var quickreply = [
  {
    "content_type":"text",
    "title":"Leave Policies",
    "payload":"Leave Policies"
  },
  {
    "content_type":"text",
    "title":"Benefits",
    "payload":"Benefits"
  },
  {
    "content_type":"text",
    "title":"Payroll",
    "payload":"Payroll"
  },
  {
    "content_type":"text",
    "title":"Code of Conduct",
    "payload":"Code of Conduct"
  },
  {
    "content_type":"text",
    "title":"Exit Policies",
    "payload":"Exit Policies"
  }
  ,
  {
    "content_type":"text",
    "title":"Log In",
    "payload":"Log In"
  }
];
var moviesObj =  [
  {
    "name": "Movies",
    "imgurl": 'https://fankickdev.blob.core.windows.net/images/movies.jpg'
},
{
    "name": "Celebrities",
    "imgurl": 'https://fankickdev.blob.core.windows.net/images/celebrities.jpg'
},
{
    "name": "Politics",
    "imgurl": 'https://fankickdev.blob.core.windows.net/images/music.jpg'
},
{
    "name": "Sports",
    "imgurl": 'https://fankickdev.blob.core.windows.net/images/sports.jpg'
}
];

var quickMenu = [
  {
    "content_type":"text",
    "title":"Categories",
    "payload":"Categories"
  },
  {
    "content_type":"text",
    "title":"Fan Clubs",
    "payload":"Fan Clubs"
  },
  {
    "content_type":"text",
    "title":"Fan Magazine",
    "payload":"Fan Magazine"
  }
];
//app.use(bodyParser.json());
//console.log("------:thread:-----");

const sendContentPacks = (categoryName,event) => {
  console.log("*************---categoryName----*******", categoryName );
    // if (categoryName == "Categories") {
    //   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",moviesObj);
    //   if (moviesObj.length){
    //     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",moviesObj.length);
    //     var senderID = event.sender.id;
    //     var contentList = [];
    //     for (var i = 0; i < moviesObj.length; i++) { //Construct request body
    //         var keyMap = {
    //                       "title": moviesObj[i].name,
    //                       "image_url": moviesObj[i].imgurl,
    //                                 //"item_url": moviesObj[i].imgurl,
    //                       "buttons": [{
    //                                   "type": "postback",
    //                                   "title": moviesObj[i].name,
    //                                   "payload": moviesObj[i].name
    //                                 }]
    //                             };
    //
    //         contentList.push(keyMap);
    //     }
    //     var messageData = {
    //         "recipient": {
    //             "id": senderID
    //         },
    //         "message": {
    //             "attachment": {
    //                 "type": "template",
    //                 //"text":"We have some cool stuff waiting for you..",
    //                 "payload": {
    //                     "template_type": "generic",
    //                     "elements": contentList
    //                 }
    //             },
    //             //"quick_replies": quickMenu
    //         }
    //     }
    //   }
    //     //callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
    //       callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
    // } else
    if (categoryName == "Get Started") {
        //greetingtext(messagingEvent,Get Started);
        var senderID = event.sender.id;
        thread.persistentMenu(fbpage_access_token);
        fbuserdetails(event, senderID);
        //sendTextMessage(userid, 'Get Started');
        console.log("categoryName", categoryName);
        //getStarted();
    }
    // else if (categoryName == "Fan Clubs") {
    //   pool.getConnection(function(err, connection) {
    //     connection.query('SELECT * FROM fk_pack_fanclub', function(err, rows) {
    //         if (err) {
    //             console.log("Error While retriving content pack data from database:", err);
    //         } else if (rows.length) {
    //             var senderID = event.sender.id;
    //             var contentList = [];
    //
    //             for (var i = 0; i < rows.length; i++) { //Construct request body
    //                 var keyMap = {
    //                     "title": rows[i].name,
    //                     "image_url": rows[i].img_url,
    //                     //"item_url": rows[i].imageurl,
    //                     // "buttons": [{
    //                     //     "type": "web_url",
    //                     //     "url": rows[i].name,
    //                     //     "title": rows[i].name
    //                     // }]
    //                     "buttons": [{
    //                         "type": "postback",
    //                         "title": rows[i].name,
    //                         "payload": rows[i].name
    //                     }]
    //                 };
    //                 contentList.push(keyMap);
    //             }
    //             var messageData = {
    //                 "recipient": {
    //                     "id": senderID
    //                 },
    //                 "message": {
    //                     "attachment": {
    //                         "type": "template",
    //                         "payload": {
    //                             "template_type": "generic",
    //                             "elements": contentList
    //                         }
    //                     },
    //                       "quick_replies": quickMenu
    //                 }
    //             }
    //             //callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
    //               callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
    //         } else {
    //             console.log("No Data Found From Database");
    //             sendHelpMessage(event);
    //         }
    //         connection.release();
    //     });
    //   });
    // } else if (categoryName == "Fan Magazine") {
    //     //console.log("***************************", categoryName);
    //     pool.getConnection(function(err, connection) {
    //     connection.query('SELECT * FROM fk_pack_fan_magazines', function(err, rows) {
    //         //console.log("*************************-after", categoryName);
    //         console.log("*************************-after", rows);
    //         if (err) {
    //             console.log("Error While retriving content pack data from database:", err);
    //         } else if (rows.length) {
    //             var senderID = event.sender.id;
    //             var contentList = [];
    //             for (var i = 0; i < 5; i++) { //Construct request body
    //                 var keyMap = {
    //                     "title": rows[i].name,
    //                     "image_url": rows[i].imageurl,
    //                     //"item_url": rows[i].imageurl,
    //                     //"subtitle":"We\'ve got the right hat for everyone."
    //                     "buttons": [{
    //                         "type": "postback",
    //                         "title": "Read More",
    //                         "payload": "USER_DEFINED_PAYLOAD"
    //                     }]
    //                 };
    //                 contentList.push(keyMap);
    //             }
    //             var messageData = {
    //                 "recipient": {
    //                     "id": senderID
    //                 },
    //                 "message": {
    //                     "attachment": {
    //                         "type": "template",
    //                         "payload": {
    //                             "template_type": "generic",
    //                             "elements": contentList
    //                         }
    //                     },
    //                     "quick_replies": quickMenu
    //                 }
    //             }
    //             //callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
    //               callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
    //         } else {
    //             console.log("No Data Found From Database");
    //             sendHelpMessage(event);
    //         }
    //         connection.release();
    //     });
    //   });
    // }
    else if (categoryName == "Log In") {
      if (categoryName == "Log In"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message": {
               "attachment": {
                 "type": "template",
                 "payload": {
                   "template_type": "generic",
                   "elements": [{
                     "title": "Welcome to HR-HelpDesk",
                     "image_url": "http://www.example.com/images/m-bank.png",
                     "buttons": [{
                       "type": "account_link",
                       "url": "sample.html"
                     },
                     {
                       "type": "postback",
                       "title": "Skip",
                       "payload": "USER_DEFINED_PAYLOAD"
                     }]
                   }]
                 }
               },
               "quick_replies": quickreply
        }
  //       "message":{
  //   "attachment":{
  //     "type":"template",
  //     "payload":{
  //       "template_type":"receipt",
  //       "recipient_name":"Stephane Crozatier",
  //       "order_number":"12345678902",
  //       "currency":"USD",
  //       "payment_method":"Visa 2345",
  //       "order_url":"http://petersapparel.parseapp.com/order?order_id=123456",
  //       "timestamp":"1428444852",
  //       "elements":[
  //         {
  //           "title":"Classic White T-Shirt",
  //           "subtitle":"100% Soft and Luxurious Cotton",
  //           "quantity":2,
  //           "price":50,
  //           "currency":"USD",
  //           "image_url":"http://petersapparel.parseapp.com/img/whiteshirt.png"
  //         },
  //         {
  //           "title":"Classic Gray T-Shirt",
  //           "subtitle":"100% Soft and Luxurious Cotton",
  //           "quantity":1,
  //           "price":25,
  //           "currency":"USD",
  //           "image_url":"http://petersapparel.parseapp.com/img/grayshirt.png"
  //         }
  //       ],
  //       "address":{
  //         "street_1":"1 Hacker Way",
  //         "street_2":"",
  //         "city":"Menlo Park",
  //         "postal_code":"94025",
  //         "state":"CA",
  //         "country":"US"
  //       },
  //       "summary":{
  //         "subtotal":75.00,
  //         "shipping_cost":4.95,
  //         "total_tax":6.19,
  //         "total_cost":56.14
  //       },
  //       "adjustments":[
  //         {
  //           "name":"New Customer Discount",
  //           "amount":20
  //         },
  //         {
  //           "name":"$10 Off Coupon",
  //           "amount":10
  //         }
  //       ]
  //     }
  //   }
  // }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Log Out") {
      if (categoryName == "Log Out"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message": {
               "attachment": {
                 "type": "template",
                 "payload": {
                   "template_type": "generic",
                   "elements": [{
                     "title": "Welcome to HR-HelpDesk",
                     "image_url": "http://www.example.com/images/m-bank.png",
                     "buttons": [{
                       "type": "account_unlink",
                       //"url": "https://www.example.com/authorize"
                     },
                     {
                       "type": "postback",
                       "title": "Skip",
                       "payload": "USER_DEFINED_PAYLOAD"
                     }]
                   }]
                 }
               },
               "quick_replies": quickreply
        }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Leave Policies") {
      if (categoryName == "Leave Policies"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"What do you want know about leaves…",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Leave Types",
                    "payload":"Leave Types"
                  },
                  {
                    "content_type":"text",
                    "title":"Leave Balance",
                    "payload":"Leave Balance"
                  },
                  {
                    "content_type":"text",
                    "title":"How to apply a leave",
                    "payload":"How to apply a leave"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Benefits") {
      if (categoryName == "Benefits"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"What do you want to know about benefits…",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Insurance",
                    "payload":"Apply"
                  },
                  {
                    "content_type":"text",
                    "title":"Bonus",
                    "payload":"Bonus"
                  },
                  {
                    "content_type":"text",
                    "title":"Provident Fund",
                    "payload":"PF"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Exit Policies") {
      if (categoryName == "Exit Policies"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"What do you want to know about exit policies…",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Notice Period",
                    "payload":"Notice Period"
                  },
                  {
                    "content_type":"text",
                    "title":"Special Concerns",
                    "payload":"Special Concerns"
                  },
                  {
                    "content_type":"text",
                    "title":"Relieving Letter",
                    "payload":"Relieving Letter"
                  },
                {
                    "content_type":"text",
                    "title":"Settlement",
                    "payload":"Settlement"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Payroll") {
      if (categoryName == "Payroll"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"What do you want to know about payroll…",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Pay Slips",
                    "payload":"Pay Slips"
                  },
                  {
                    "content_type":"text",
                    "title":"Claims",
                    "payload":"Claims"
                  },
                  {
                    "content_type":"text",
                    "title":"Payroll Policy",
                    "payload":"Payroll Policy"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Code of Conduct") {
      if (categoryName == "Code of Conduct"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"What do you want to know about Code of Conduct",
                "quick_replies":quickreply
                // [
                //   {
                //     "content_type":"text",
                //     "title":"Apply",
                //     "payload":"Apply"
                //   },
                //   {
                //     "content_type":"text",
                //     "title":"Leave Balance",
                //     "payload":"Leave Balance"
                //   },
                //   {
                //     "content_type":"text",
                //     "title":"Holidays",
                //     "payload":"Holidays"
                //   }
                // ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Leave Balance") {
      if (categoryName == "Leave Balance"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"You have 12 Annual and 3 Sick Leaves in you Leave Basket",
                "quick_replies":quickreply
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Leave Types") {
      if (categoryName == "Leave Types"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"At Gemini we have Annual Leaves, Sick Leaves, Maternity Leaves, and Paternity Leaves.\n\nSelect the Leave Type to know more details",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Annual Leaves",
                    "payload":"Annual Leaves"
                  },
                  {
                    "content_type":"text",
                    "title":"Sick Leaves",
                    "payload":"Sick Leaves"
                  },
                  {
                    "content_type":"text",
                    "title":"Maternity Leaves",
                    "payload":"Maternity Leaves"
                  },
                  {
                    "content_type":"text",
                    "title":"Paternity Leaves",
                    "payload":"Paternity Leaves"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Notice Period") {
      if (categoryName == "Notice Period"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"Let me know your employee ID…",
                "quick_replies":quickreply
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Pay Slips") {
      if (categoryName == "Pay Slips"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"Let me know your employee ID…",
                "quick_replies":quickreply
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Insurance") {
      if (categoryName == "Insurance"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"You are eligible for free health insurance policy…\n\nYou can download and refer your insurance policies from here….\n\nSelect the policy you want to refer…",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Health Insurance",
                    "payload":"Health Insurance"
                  },
                  {
                    "content_type":"text",
                    "title":"Family Insurance",
                    "payload":"Family Insurance"
                  },
                  {
                    "content_type":"text",
                    "title":"Accidental Insurance",
                    "payload":"Accidental Insurance"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Health Insurance") {
      var hiurl = "http://HealthInsurancePolicy.pdf";
      if (categoryName == "Health Insurance"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":'Download your policy…\n\n'+hiurl+'',
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"That’s it",
                    "payload":"That’s it"
                  },
                  {
                    "content_type":"text",
                    "title":"Some other query",
                    "payload":"Some other query"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "That’s it") {
      if (categoryName == "That’s it"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"I am always willing to answer you, have a nice day.",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Bye!",
                    "payload":"Bye!"
                  }
                ]
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else if (categoryName == "Bye!") {
      if (categoryName == "Bye!"){
        var senderID = event.sender.id;
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":"Bye!",
                "quick_replies":quickreply
              }
        }
      //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
          callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        }else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
        }
    }else{
           var empid = categoryName.substr(0,2);
           var epurl ="http://Exitpolicies.pdf";
           if(empid == "GI" || empid == "gi"){
             var senderID = event.sender.id;
             var messageData = {
                 "recipient": {
                     "id": senderID
                 },
                 "message":{
                     "text":'Tell me what would you like to know about?',
                     "quick_replies":quickreply
                   }
             }
           //  callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
               callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
           }
         else {
                  console.log("No Data Found From Database");
                  sendHelpMessage(event);
                  //sendImageMessage(event);
              }
    }
}

function celebritiesdetails(categoryName,event){
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * fk_pack_fanclub where name=?',[categoryName], function(err, rows) {
        if (err) {
            console.log("Error While retriving content pack data from database:", err);
        } else if (rows.length) {
            var senderID = event.sender.id;
            var contentList = [];

            for (var i = 0; i < rows.length; i++) { //Construct request body
                var keyMap = {
                    "title": rows[i].name,
                    "image_url": rows[i].image_url,
                  //  "item_url": rows[i].image_url,
                    "buttons": [{
                        "type": "postback",
                        "title": "View",
                        "payload": rows[i].id
                    }
                  //   // , {
                  //   //     "type": "postback",
                  //   //     "title": "Magazine",
                  //   //     "payload": "USER_DEFINED_PAYLOAD"
                  //   // }
                  ]
                };
                contentList.push(keyMap);
            }
            var messageData = {
                "recipient": {
                    "id": senderID
                },
                "message": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": contentList
                        }
                    },
                    "quick_replies":quickMenu
                }
            }
            //callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
              callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
        } else {
            console.log("No Data Found From Database");
            sendHelpMessage(event);
            //sendImageMessage(event);
        }
        connection.release();
    });
    });
}

function sendHelpMessage(event){
    var userid = event.sender.id;
    var url = 'https://graph.facebook.com/v2.6/' + userid + '?fields=first_name,last_name,locale,timezone,gender&access_token=' + fbpage_access_token + '';
    console.log("url", url);
    request({
        "uri": url,
        "method": 'GET'
    }, function(error, response, body) {
        var userprofiledata = JSON.parse(response.body);
        var username = userprofiledata.first_name;
        //console.log("--------:Response data:-------- ", JSON.stringify(body));
        // console.log("--------:Response data:--------first_name ", userprofiledata.first_name);
        // console.log("--------:Response data:--------last_name ", userprofiledata.last_name);
        // console.log("--------:Response data:--------locale ", userprofiledata.locale);
        // console.log("--------:Response data:-------- timezone", userprofiledata.timezone);
        // console.log("--------:Response data:--------gender ", userprofiledata.gender);
        var senderID = event.sender.id;
        var msg = 'Hi '+username+'!,\n \nLet me know your query..';
        //var msg = 'Hey '+username+', How are you?';
        console.log("--------:Response data:--------sendHelpMessage1", msg);
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":msg,
                //"text":"msg",
                "quick_replies":quickreply
              }
            }
        // callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
           callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
         //sendHelpMessageSecond(event, userid);
         if (!error && response.statusCode == 200) {
             var recipientId = body.recipient_id;
             var messageId = body.message_id;
             console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
             //searchText.sendHelpMessageSecond(event, userid);
         } else {
             console.error("Unable to send message.");
             //console.error(response);
             console.error("Error while sending message:", error);
         }
    });
}

// const fbuserdetails = (event,userid) =>{
function fbuserdetails(event, userid) {
    var url = 'https://graph.facebook.com/v2.6/' + userid + '?fields=first_name,last_name,locale,timezone,gender&access_token=' + fbpage_access_token + '';
    console.log("url", url);
    request({
        "uri": url,
        "method": 'GET'
    }, function(error, response, body) {
        var userprofiledata = JSON.parse(response.body);
        var username = userprofiledata.first_name;
        //console.log("--------:Response data:-------- ", JSON.stringify(body));
        // console.log("--------:Response data:--------first_name ", userprofiledata.first_name);
        // console.log("--------:Response data:--------last_name ", userprofiledata.last_name);
        // console.log("--------:Response data:--------locale ", userprofiledata.locale);
        // console.log("--------:Response data:-------- timezone", userprofiledata.timezone);
        // console.log("--------:Response data:--------gender ", userprofiledata.gender);
        var senderID = event.sender.id;
        //var msg = 'Hi '+username+', A lot of exciting things are awaiting for you! Get kicking!';
        //var msg = 'Hi '+username+'! My name is Kicker.\n How may I come of any help to you today?';
        var msg = 'Hi '+username+'! I am Hira, and I am your personal HR assistant. I can help you resolve all your HR queries.\n\nProvide me your Employee ID to help you better.';
  //var msg = 'Hi '+username+'! My name is Kicker.';
        console.log("--------:Response data:--------msg1 ", msg);
        var messageData = {
            "recipient": {
                "id": senderID
            },
            "message":{
                "text":msg,
                "quick_replies":quickreply
              }
            }
         //callSendAPI(messageData,'https://graph.facebook.com/v2.6/592208327626213/messages');
           callSendAPI(messageData,'https://graph.facebook.com/v2.6/me/messages');
         //fbuserdetailsSecond(event, userid);

        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
            console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            //console.error(response);
            console.error("Error while sending message:", error);
        }
    });
}

function callSendAPI(body, url) {
    console.log("url", url);
    console.log("Body", body);
    request({
        uri: url,
        qs: {
            access_token: fbpage_access_token
        },
        method: 'POST',
        json: body,
        headers: {
            "Content-Type": "application/json"
        }
    }, function(error, response, body) {
        console.log("Response data:-- ", JSON.stringify(body));
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
            console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            //console.error(response);
            console.error("Error while sending message:", error);
        }
    });
}

module.exports = {
  sendContentPacks: sendContentPacks,
  //fbuserdetails:fbuserdetails,
  // name:name,
  quickMenu:quickMenu
};
