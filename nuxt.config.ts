import dotenv from "dotenv";
dotenv.config();
export default defineNuxtConfig({

    runtimeConfig: {
        STRIPE_SK: process.env.STRIPE_SK,
        STRIPE_WH_SK: process.env.STRIPE_WH_SK,
        DATABASE_URL: process.env.DATABASE_URL,
        APP_ENVIRONMENT: process.env.APP_ENVIRONMENT,
        SEND_IN_BLUE_API: process.env.SEND_IN_BLUE_API,
        public: {
            STRIPE_PK: process.env.STRIPE_PK,
            BASE_URL: process.env.BASE_URL,
            GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
        }
    },
    buildModules: ['@pinia/nuxt'],
    modules: ['@vuestic/nuxt'],
    vuestic: {
        config: {
            colors: {
                presets: {
                    light: {
                        primary: '#ffd166',
                        secondary: '#767C88',
                    },
                    dark: {
                        primary: '#ffd166',
                        secondary: '#767C88'
                    }
                }
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
                }
            ],
            
        }
    },
    css: ["~/assets/css/tailwind.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    }
});
