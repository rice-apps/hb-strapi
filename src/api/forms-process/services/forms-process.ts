const {RecaptchaV3} = require('recaptcha-node');
const recaptcha = new RecaptchaV3(process.env.RECAPTCHA_SECRET_KEY);
/**
 * forms-process service
 */

export default () => ({
    // Handle phoneNumberString and emailString, storing it in the userform collection
    async addUserForm(emailString: string, phoneNumberString: string, token: string) {
        // Check if token is valid
        const verifyResult = await recaptcha.verify(token);
        if (verifyResult.success && verifyResult.score > 0.5) {
            // Adds to DB
            await strapi.query("api::userform.userform").create({
                data: {
                    emailString: emailString,
                    phoneNumberString: phoneNumberString,
                },
            });
        }
    },

});
