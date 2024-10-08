const {RecaptchaV3} = require('recaptcha-node');
const recaptcha = new RecaptchaV3(process.env.RECAPTCHA_SECRET_KEY);
/**
 * forms-process service
 */

export default () => ({
    // Handle phoneNumberString and emailString, storing it in the userform collection
    async addUserForm(name:string, emailString: string, phoneNumberString: string, token: string) {
        // Check if token is valid
        const verifyResult = await recaptcha.verify(token);
        strapi.log.info("Recaptcha verify result: " + JSON.stringify(verifyResult));
        if (verifyResult.success && verifyResult.score >= 0.5) {
            // Adds to DB
            await strapi.query("api::userform.userform").create({
                data: {
                    name: name,
                    emailString: emailString,
                    phoneNumberString: phoneNumberString,
                },
            });
        }
    },

});
