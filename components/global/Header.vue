<template>

<ShoppingCart />

<header class="header-wrapper flex flex-col-reverse items-center border-b-4 border-black">
    <img class="absolute w-10/12 z-[2] max-w-xl pb-[.5rem]" :src="titleText" />
    <img :src="testLogo" class="z-[1] w-36 sm:w-48" />
    <div class="logo-circle absolute w-28 h-28 rounded-full top-4 left-[calc(50%-3.8rem)]"></div>
    <!-- Hamburg mobil menu icon -->
    <label id="hamburg-icon" class="md:hidden z-[3] absolute top-4 right-4 w-8" for="checkbox">
        <svg class="hamburgMenuIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
    </label>
    <!-- Checkbox for the mobile menu -->
    <input class="hidden" v-model="dropdown" type="checkbox" id="checkbox" />
</header>

<!-- The gradient bottom border -->
<div class="header-bottom-wrapper">
    <!-- Desktop menu -->
    <span class="hidden md:flex">
        <nav class="flex gap-36 pb-2">            
        <!-- <Fire class="absolute left-[calc(50%-3.4rem)] top[-3rem] w-[4rem]"/> -->
        <div class="flex gap-2 w-1/4 text-right">
            <h6 class="va-h6"><nuxt-link class="va-link" :to="config.public.BASE_URL">Home</nuxt-link></h6>
            <h6 class="va-h6"><a class="va-link" href="#">Contact</a></h6>
        </div>
        <div class="flex gap-2 w-1/4 text-left">
            <h6 class="va-h6"><a class="va-link" href="#">Products</a></h6>
            <h6 class="va-h6"><a class="va-link" href="#">About Us</a></h6>
        </div>
    </nav>
    </span>
</div>

<!-- Mobile menu -->

<span class="md:hidden">
    <Transition name="slide-fade">
    <nav v-if="dropdown" class="flex gap-36 pb-6">            
        <Fire class="absolute left-[calc(50%-3.2rem)] top-[-3rem] w-[4.4rem]"/>
        <div class="flex flex-col gap-2 w-1/4 text-right">
            <p><nuxt-link class="va-link" :to="config.public.BASE_URL">Home&nbsp;&nbsp;&nbsp;&nbsp;</nuxt-link></p>
            <p><a class="va-link" href="#">Contact&nbsp;&nbsp;</a></p>
        </div>
        <div class="flex flex-col gap-2 w-1/4 text-left">
            <p><a class="va-link" href="#">Products</a></p>
            <p><a class="va-link" href="#">About Us</a></p>
        </div>
    </nav>
</Transition>
</span>
</template>


<script setup>

import { ref } from 'vue';
import titleText from  '/img/title.svg';
import testLogo from  '/img/started-logo-1.svg';

// Pinia store
const config = useRuntimeConfig();
const router = useRouter();
let dropdown = ref(false);

</script>


<style lang="scss" scoped>

.header-wrapper {
    background: rgb(195,78,27);
    background: linear-gradient(0deg, rgba(195,78,27,1) 8%, rgba(255,94,0,1) 31%, rgba(252,227,115,1) 77%); 
}
.logo-circle {
    background: rgb(251,254,0);
    background: radial-gradient(circle, rgba(251,254,0,1) 0%, rgba(255,105,3,1) 100%, rgba(214,255,0,1) 100%);
}
#hamburg-icon {
    fill: #231f20;
}  
.header-bottom-wrapper {
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(195,78,27,1) 100%); 
    padding: .4rem 0
}
nav {
    display: flex;
    position: absolute;
    left: 0;
    z-index: 1;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(171,74,32,1) 81%, rgba(195,78,27,1) 100%); 
    width: 100%;
    margin: -1rem 0 0 0; // to hide the bottom gradient border when the mobil menu is opened
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
