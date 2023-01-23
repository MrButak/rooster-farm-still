// import sgMail from '@sendgrid/mail'
import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from "dotenv";
dotenv.config();

function sendPaymentSuccessEmail(paymentIntent) {
    
    let itemsPurchased = [];
    let products = JSON.parse(paymentIntent.metadata.itemsPurchased);
    
    Object.keys(products).forEach((key) => {
        itemsPurchased.push({
            name: products[key].name,
            price: (products[key].price_in_cents * 100) * products[key].quantity,
            quantity: products[key].quantity
        });
    });
    
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API;
    var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    
    sendSmtpEmail = {

        to: [{
            email: paymentIntent.receipt_email,
            name: paymentIntent.shipping.name
        }],
        templateId: 1,
        params: {
            
            customerName: paymentIntent.shipping.name,
            streetAddress: paymentIntent.shipping.address.line1,
            streetAddress2: paymentIntent.shipping.address.line2,
            city: paymentIntent.shipping.address.city,
            state: paymentIntent.shipping.address.state,
            postalCode: paymentIntent.shipping.address.postal_code,
            country: paymentIntent.shipping.address.country,
            paymentAmount: paymentIntent.amount / 100, // amount in cents,
            products: itemsPurchased
        },
    
        headers: {
            'X-Mailin-custom': `api-key: ${process.env.SEND_IN_BLUE_API}|content-type: application/json|accept: application/json`
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('email API called successfully.');
        // console.log(data);
        
    }, function(error) {
        console.error(error);
    });
};

export { sendPaymentSuccessEmail };