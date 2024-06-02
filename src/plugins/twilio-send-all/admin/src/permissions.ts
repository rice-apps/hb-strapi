export { pluginPermissions };

const pluginPermissions = {
  smsButton: [{ action: 'plugin::twilio-send-all.sms', subject: null }],
  signButton: [{ action: 'plugin::twilio-send-all.sign-up', subject: null }],
};
