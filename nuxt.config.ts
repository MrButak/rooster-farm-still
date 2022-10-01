import dotenv from "dotenv";
dotenv.config();
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    // privateRuntimeConfig: {

    // }
    // publicRuntimeConfig: {
        
    // }
    
    runtimeConfig: {
        STRIPE_SK: process.env.STRIPE_SK,
        NUXT_DB_URL: process.env.NUXT_DB_URL,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT,
        public: {
            STRIPE_PK: process.env.STRIPE_PK
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
