// var SibApiV3Sdk = require('sib-api-v3-sdk');
// import dotenv from "dotenv";
// dotenv.config();

// import sibPackage from 'sib-api-v3-sdk';
// const { SibApiV3Sdk } = sibPackage;
// const email_sk = process.env.SEND_IN_BLUE_API;



// var defaultClient = SibApiV3Sdk.ApiClient.instance;

// // Configure API key authorization: api-key
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.SEND_IN_BLUE_API

function sendPaymentSuccessEmail(paymentIntent) {
    
    // console.log(chargeSucceeded['shipping']['address'])
    
    // create an array of purchased item objects (send in blue template only allows looping through an array of objects)
    // let shoppingCart = [];
    // let tmpItemObj = JSON.parse(paymentIntent['metadata']['itemsPurchased'])
    // Object.keys(tmpItemObj).forEach((key) => {
    //     shoppingCart.push(tmpItemObj[key])
        
    // });
    // var defaultClient = SibApiV3Sdk.ApiClient.instance;
    // // // Configure API key authorization: api-key
    // var apiKey = defaultClient.authentications['api-key'];
    // apiKey.apiKey = email_sk;
    
    // var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    // var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    // console.log(apiInstance)
    // sendSmtpEmail = {

    //     to: [{
    //         email: paymentIntent['receipt_email'],
    //         name: paymentIntent['shipping.name']
    //     }],
    //     templateId: 1,
    //     params: {
            
    //         customerName: paymentIntent['shipping']['name'],
    //         streetAddress: paymentIntent['shipping']['address']['line1'],
    //         streetAddress2: paymentIntent['shipping']['address']['line2'],
    //         city: paymentIntent['shipping']['address']['city'],
    //         state: paymentIntent['shipping']['address']['state'],
    //         postalCode: paymentIntent['shipping']['address']['postal_code'],
    //         country: paymentIntent['shipping']['address']['country'],
    //         paymentAmount: paymentIntent['amount'] / 100, // amount in cents,
    //         // must be an array of objects for email template to loop through items
    //         products: shoppingCart
    //     },
    
    //     headers: {
    //         // should include sk?
    //         'X-Mailin-custom': 'api-key: email_sk|content-type: application/json|accept: application/json'
    //     }
    // };
    
    // apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    //     console.log('email API called successfully.');
    //     console.log(data);
        
    // }, function(error) {
    //     console.error(error);
    // });

};

export { sendPaymentSuccessEmail };