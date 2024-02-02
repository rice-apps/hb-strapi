import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    console.log('ctx.request.body.messageContent');
    ctx.body = strapi
      .plugin('twilio-send-all')
      .service('myService')
      .sendMessages("test");
  },
});
