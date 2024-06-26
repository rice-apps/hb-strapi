import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('twilio-send-all')
      .service('myService')
      .sendEmails();
    ctx.send({
        message: 'Message sent.'
    }, 201);
  },
});
