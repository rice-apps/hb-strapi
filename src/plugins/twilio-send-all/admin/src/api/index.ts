import { request } from '@strapi/helper-plugin';

import pluginId from '../pluginId';

export const api = {
  sendMessage,
};

async function sendMessage({ messageContent } : { messageContent: string }) {
  console.log("run send");
  const data = await request(`/${pluginId}/sendMessage`, {
    method: 'POST',
    body: JSON.stringify(["test"]),
  });

  console.log("send run complete");
  return data;
}