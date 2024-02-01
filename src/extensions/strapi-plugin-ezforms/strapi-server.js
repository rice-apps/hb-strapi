const utils = require('@strapi/utils');

module.exports = (plugin) => {

    const { ValidationError } = utils.errors;

    plugin.controllers.submitController = async (ctx) => {
        // Check if formData is in body
        if (!ctx.request.body.formData) {
            throw new ValidationError('formData is required');
        }
        // Check if emailString and phoneNumberString are in formData
        if (!ctx.request.body.formData.emailString || !ctx.request.body.formData.phoneNumberString) {
            throw new ValidationError('emailString and phoneNumberString is required');
        }

        // Adds to DB
        try {
            await strapi.query('api::userform.userform').create({
                data: {
                    emailString: ctx.request.body.formData.emailString,
                    phoneNumberString: ctx.request.body.formData.phoneNumberString,
                }
            });
        } catch (e) {
            strapi.log.error(e);
            return ctx.internalServerError('A Whoopsie Happened');
        }

    }

    return plugin;

};
