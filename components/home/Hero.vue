<template>

<div class="hero-wrapper">
    <img :src="testLogo" class="logo-home" />
    <div class="logo-circle"></div>
    <!-- <p>Made in Tennesse</p>
    <p>text 2</p> -->
</div>

</template>


<script setup>

import testLogo from  '../../assests/img/started-logo-1.svg';

</script>



<style lang="scss">

.hero-wrapper {
    display: flex;
    width: 100%;
    height: 6rem;
    align-items: flex-end;
    padding: 0 1rem 0.4rem 1rem;
    background: rgb(182, 69, 21);
    background: linear-gradient(0deg, #b54514 0%, rgb(255, 94, 0) 49%, rgb(252, 227, 115) 100%);
    justify-content: space-between;

    .logo-home {
        position: absolute;
        top: 0;
        left: calc(50% - 4.5rem);
        z-index: 2;
        width: 10rem;
    }
    .logo-circle {
        position: absolute;
        width: 6rem;
        height: 6rem;
        background: rgb(251,254,0);
        background: radial-gradient(circle, rgba(251,254,0,1) 0%, rgba(255,105,3,1) 100%, rgba(214,255,0,1) 100%);
        border-radius: 50%;
        left: calc(50% - 3rem);
        top: 1rem;

    }
}
@media (min-width: 900px) { 

    .hero-wrapper {
        width: 100%;
        height: 1rem;
        background-color: #fce373;
    }
}
</style>