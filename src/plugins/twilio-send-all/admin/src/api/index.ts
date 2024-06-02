// @ts-nocheck
import { request } from '@strapi/helper-plugin';

import pluginId from '../pluginId';

export const api = {
  sendMessage,
  sendNotification,
};

async function sendMessage({ messageContent } : { messageContent: string }) {
  const data = await request(`/${pluginId}/sendMessage`, {
    method: 'POST',
    body: {content: messageContent},
  });
  return data;
}

async function sendNotification() {
  const data = await request(`/${pluginId}/sendNotification`, {
    method: 'POST',
  })
  return data;
}