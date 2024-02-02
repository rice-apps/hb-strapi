export default {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/forms-process',
    //  handler: 'forms-process.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
     {
     method: 'POST',
     path: '/form-process',
     handler: 'forms-process.formProcess',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
