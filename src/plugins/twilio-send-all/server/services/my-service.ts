import { Strapi } from '@strapi/strapi';
//const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export default ({ strapi }: { strapi: Strapi }) => ({
  async sendMessages(messageContent) {
    const entries = await strapi.query('api::userform.userform').findMany({
      select: ['emailString', 'phoneNumberString'],
      limit: 10000,
    });

    // On each entry send a twilio message containing the messageContent
    entries.forEach((entry) => {
      // Send a twilio message
      // twilio.sendMessage(entry.phoneNumberString, messageContent);
      /** 
      client.messages
      .create({
         body: messageContent,
         from: '+17865286322',
         to: entry.phoneNumberString
       })
      .then(message => console.log(message.sid));*/
    });
  },
});
