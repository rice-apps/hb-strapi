// @ts-nocheck
import { request } from '@strapi/helper-plugin';

import pluginId from '../pluginId';

export const api = {
  sendMessage,
};

async function sendMessage({ messageContent } : { messageContent: string }) {
  const data = await request(`/${pluginId}/sendMessage`, {
    method: 'POST',
    body: {content: messageContent},
  });
  return data;
}