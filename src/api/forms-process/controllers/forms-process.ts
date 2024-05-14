/**
 * A set of functions called "actions" for `forms-process`
 */

export default {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  async formProcess(ctx) {
  // Check if emailString and phoneNumberString are in formData
  if (
    !ctx.request.body.emailString ||
    !ctx.request.body.phoneNumberString || !ctx.request.body.token
  ) {
      return ctx.badRequest("Missing emailString or phoneNumberString");
  }

  // Adds to DB
  try {
    await strapi.service("api::forms-process.forms-process").addUserForm(ctx.request.body.emailString, ctx.request.body.phoneNumberString, ctx.request.body.token);
  } catch (e) {
    strapi.log.error(e);
    return ctx.internalServerError("A Whoopsie Happened");
  }
  ctx.send({
    message: 'Form data created.'
}, 201);
}
};
