export default [
  {
    method: 'POST',
    path: '/sendMessage',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
];
