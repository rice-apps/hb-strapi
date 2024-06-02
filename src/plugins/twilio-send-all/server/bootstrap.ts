import { Strapi } from '@strapi/strapi';

export default async ({ strapi }: { strapi: Strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Send Sign-up',
      uid: 'sign-up',
      pluginName: 'twilio-send-all',
    },
    {
      section: 'plugins',
      displayName: 'Send SMS',
      uid: 'sms',
      pluginName: 'twilio-send-all',
    }
  ];

  await (strapi as any).admin.services.permission.actionProvider.registerMany(actions);
};
