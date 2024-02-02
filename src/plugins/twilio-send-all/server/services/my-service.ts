import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async sendMessages(messageContent) {
    const entries = await strapi.db.query('api::blog.article').findMany({
      select: ['emailString', 'phoneNumberString'],
      limit: 10000,
    });

    // On each entry send a twilio message containing the messageContent
    entries.forEach((entry) => {
      // Send a twilio message
      // twilio.sendMessage(entry.phoneNumberString, messageContent);
    });
  },
});
