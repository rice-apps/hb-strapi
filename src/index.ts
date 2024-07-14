// @ts-nocheck
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    strapi.db.lifecycles.subscribe({
      models: ["admin::user"],
      async afterCreate(event) {
        let userEmail = (event as any).result.email;
        const entry = await strapi.db.query("api::vendor.vendor").findOne({
          where: { email: userEmail },
        });

        if (entry) {
          await strapi.entityService.update("api::vendor.vendor", entry.id, {
            data: {
              createdBy: (event as any).result.id,
            },
          });
        }
      },
      async beforeCreate(event) {},
    });

    strapi.db.lifecycles.subscribe({
      models: ["api::vendor.vendor"],
      async beforeCreate(event) {
        // Check the number of categories
        if (
          event.params.data.categories &&
          event.params.data.categories.connect.length -
            event.params.data.categories.disconnect.length >
            2
        ) {
          throw new Error("An merchant can have a maximum of 2 categories");
        }
      },
      async beforeUpdate(event) {
        const entry = await strapi.db.query("api::vendor.vendor").findOne({
          where: { id: event.params.data.id },
          populate: ["categories"],
        });

        // Check the number of categories
        if (
          event.params.data.categories &&
          event.params.data.categories.connect.length -
            event.params.data.categories.disconnect.length +
            entry.categories.length >
            2
        ) {
          throw new Error("A merchant can have a maximum of 2 categories");
        }
      },
    });
  },
};
