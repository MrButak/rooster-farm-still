import dotenv from "dotenv";
dotenv.config();
export default defineNuxtConfig({

    // build: {
    //     transpile: ['sib-api-v3-sdk']
    // },
    runtimeConfig: {
        STRIPE_SK: process.env.STRIPE_SK,
        STRIPE_WH_SK: process.env.STRIPE_WH_SK,
        DATABASE_URL: process.env.DB_URL,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT,
        SEND_IN_BLUE_API: process.env.SEND_IN_BLUE_API,
        public: {
            STRIPE_PK: process.env.STRIPE_PK,
            BASE_URL: process.env.BASE_URL,
            GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
        }
    },
    app: {
        pageTransition: false,
        layoutTransition: false
    }
    // meta: {
    //     link: [
    //         {
    //             rel: 'stylesheet',
    //             href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css'
    //         }
    //     ],
    // },
});
