export default [
  {
    method: 'POST',
    path: '/sendMessage',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/sendNotification',
    handler: 'sendEmails.index',
    config: {
      policies: [],
    },
  },
];
