/**
 * forms-process service
 */

export default () => ({
    // Handle phoneNumberString and emailString, storing it in the userform collection
    async addUserForm(emailString: string, phoneNumberString: string) {
        // Adds to DB
        await strapi.query("api::userform.userform").create({
            data: {
                emailString: emailString,
                phoneNumberString: phoneNumberString,
            },
        });
    },

});
