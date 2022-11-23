import dotenv from "dotenv";
dotenv.config();
export default defineNuxtConfig({

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
    modules: ['@vuestic/nuxt'],
    vuestic: {
        config: {
            colors: {
                primary: '#ffd166',
                secondary: '#767C88',
                success: '#66BE33',
                info: '#3EAAF8',
                danger: '#F3403',
                warning: '#FFD952',
                gray: '#babfc2',
                dark: '#34495e',
            },
        }
    },
    app: {
        pageTransition: false,
        layoutTransition: false,
        head: {
            title: 'Rooster Valley Stills',
            meta: [
                {
                    "charset": "utf-8"
                },
                // {
                //     link: [
                //         {
                //             rel: 'stylesheet',
                //             href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css'
                //         }
                //     ],
                // }
                
            ],
            
        }
    }

});
