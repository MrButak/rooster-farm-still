import dotenv from "dotenv";
dotenv.config();
export default defineNuxtConfig({

    runtimeConfig: {
        STRIPE_SK: process.env.STRIPE_SK,
        DATABASE_URL: process.env.DB_URL,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT,
        public: {
            STRIPE_PK: process.env.STRIPE_PK,
            BASE_URL: process.env.BASE_URL,
            GOOGLE_MAPS_TOKEN: process.env.GOOGLE_MAPS_TOKEN
        }
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
