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
  async sendEmails() {
    // Create accounts for all the merchants in api::vendor.vendor that do not already exist in strapi users
    const entries = await strapi.query('api::vendor.vendor').findMany({
      select: ['email'],
      limit: 10000,
    })
    // Get role id
    const role = await strapi.query("admin::role").findOne({
      select: ['name', 'id'],
      where: { name: 'Vendor' },
    });

    console.log("sending email")
    // Send email from strapi
    await strapi.plugin('email').provider.send({
      to: 'ahmed@alcassab.net',
      from: 'no-reply@strapi.io',
      subject: "You've been invited to join the Nutcracker Market's Merchant Portal",
      text: `Hello, you have been invited to join the Nutcracker Market\'s Merchant Portal. Please click the link below to create your account and get started. https://hb-strapi-production.up.railway.app/admin/auth/register?registrationToken={user.registrationToken}`,
    })
    console.log("sent email")

    entries.forEach(async (entry) => {
      const email = entry.email;
      console.log(email);
      if (email && role) {
        let user = await strapi.query('admin::user').findOne({where: { email: email }});
        if (user && user.isActive) {
          // User already exists
          return;
        }
        if (!user) {

        console.log(user)
        // Create user with service
        user = await strapi.service("admin::user").create(
          {
            firstname: entry.name ?? email,
            email: email,
            roles: [role.id],
          }
        )
        } 
        console.log(`sending email to uninitialized user ${user.firstname} at ${email}`)
        
      }
    })
  }
});
