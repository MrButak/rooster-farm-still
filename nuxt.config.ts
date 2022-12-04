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
                        success: '#3D9209',
                        info: '#158DE3',
                        danger: '#E42222',
                        warning: '#FFD43A',
                        backgroundPrimary: '#FFFFFF',
                        backgroundSecondary: '#FFFFFF',
                        backgroundElement: '#EBF1F4',
                        backgroundBorder: '#DEE5F2',
                        textPrimary: '#262824',
                        textInverted: '#FFFFFF',
                        shadow: 'rgba(0, 0, 0, 0.12)',
                        focus: '#FFFF00',
                        backgroundLanding: '#f4f9fc',
                        backgroundLandingBorder: 'rgba(155, 179, 206, 0.8)'
                        
                    },
                    dark: {
                        primary: '#ffd166',
                        secondary: '#767C88',
                        success: '#66BE33',
                        info: '#3EAAF8',
                        danger: '#F34030',
                        warning: '#FFD952',
                        backgroundPrimary: '#050A10',
                        backgroundSecondary: '#1F262F',
                        backgroundElement: '#131A22',
                        backgroundBorder: '#3D4C58',
                        textPrimary: '#F1F1F1',
                        textInverted: '#0B121A',
                        shadow: 'rgba(0, 0, 0, 0.37)',
                        focus: '#FF0',
                        backgroundLanding: '#070d14',
                        backgroundLandingBorder: 'rgba(43, 49, 56, 0.8)'
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
        }   
    },
    nitro: {
        compressPublicAssets: true,
    }
});
