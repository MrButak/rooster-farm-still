<template>


<header class="header-wrapper">
    <span class="shopping-cart-wrapper">
        <img class="shopping-cart-icon" :src="shoppingCartIcon" />
    </span>

    <img class="heading-text" :src="titleText" />
    
    <input v-model="dropdown" @change="handleShowFlame($event)" type="checkbox" id="checkbox">
    <nav class="desktop">
        <ul class="ul-left">
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <ul class="ul-right">
            <li><a href="#">Products</a></li>
            <li><a href="#">About</a></li>
        </ul>
    </nav>
    <nav class="mobil">
        
        <ul class="ul-left" style="text-align: left;">
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact</a></li>
        </ul>

        <ul class="ul-left" style="text-align: right;">
            <li><a href="#">Products</a></li>
            <li><a href="#">About</a></li>
        </ul>

    </nav>

    <label id="hamburg-icon" class="menu-icon" for="checkbox">
        <svg class="hamburgMenuIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
    </label>

</header>

<div class="logo-wrapper">
    <img :src="testLogo" class="logo-home" />
    <div class="logo-circle"></div>
</div>
<div class="bottom-border">
</div>
<!-- <div class="black-spacer"></div>
<div class="home-hero">

</div> -->


</template>
    
<script setup>

import { ref } from 'vue';
import titleText from  '../../assests/img/title.svg';
import testLogo from  '../../assests/img/started-logo-1.svg';
import shoppingCartIcon from  '../../assests/img/shopping-cart.svg';
import { showFlame } from '../../services/stateStore';

let dropdown = ref(null);

function handleShowFlame(event) {
    
    if(dropdown.value) {
        showFlame.value = true;
    }
    else {
        showFlame.value = false;
    }
}
</script>


<style lang="scss" scoped>


// pale yellow #fce373
// darker yellow (frame) rgb(252, 227, 115);
// pale purple #cca69a
// black #231f20
// pale red #f37449;


// light #E9C891  lighter #f0f0e4 orange #D06224 dark-rusty #AE431E olive #8A8635
// darker rust #7B3C3C
// #F3F0D7

.home-hero {
    background: rgb(252,227,115);
    background: linear-gradient(0deg, rgba(252,227,115,1) 0%, rgba(254,156,53,1) 12%, rgba(255,94,0,1) 34%, rgba(218,82,10,1) 50%, rgba(181,69,20,1) 61%, rgba(5,2,0,1) 100%);
    height: 4rem;
    width: 100%;
}
.black-spacer {
    width: 100%;
    height: 2rem;
    background-color: black;
}
.shopping-cart-wrapper {
    display: flex;
    z-index: 5;
    position: fixed;
    width: 4rem;
    height: 5rem;
    border-radius: 0% 0% 50% 50%;
    transform: rotate(-90deg);
    background-color: #fce373ad;
    left: 0;
    align-items: center;
    justify-content: center;
    .shopping-cart-icon {
        width: 2.15rem;
        transform: rotate(90deg);
    }
}

.header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem 0 0;
    height: 5rem;
    background-color: #fce373;
    width: 100%;
    
    #checkbox {
        display: none;
    }
    #checkbox:checked ~ nav ul {
        max-height: 190px;
        padding: 15px 0;
        transition: all 0.5s;
    }
    #hamburg-icon {
        fill: #231f20;
        width: 2rem;
        position: absolute;
        right: 1rem;
    }
    
    
}
.heading-text {
    z-index: 3;
    position: absolute;
    top: 7rem;
    left: calc(50% - 10rem);
    width: 20rem;
}
.mobil {
    display: flex;
}
.desktop {
    display: none;
}
nav {
    display: flex;
    position: absolute;
    top: 10.9rem;
    left: 0;
    // padding: 3rem 0 0 0;
    z-index: 1;
    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(149, 57, 16) 74%, rgb(181, 69, 20) 100%);
    width: 100%;
    justify-content: space-between;
}
nav .ul-left {
    list-style-type: none;
    max-height: 0px;
    text-align: center;
    overflow: hidden;
    transition: all .2s;
}
nav .ul-right {
    list-style-type: none;
    max-height: 0px;
    overflow: hidden;
    transition: all .2s;
}
nav .ul-left li {
    padding: 0 15px;
}
nav .ul-right li {
    padding: 0 15px;
}
nav .ul-left li a {
    display: inline-block;
    padding: 12px;
    color: whitesmoke;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.05em;
}
nav .ul-right li a {
    display: inline-block;
    padding: 12px;
    color: whitesmoke;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.05em;
}
nav .ul-left li a:hover, nav ul li a:focus {
    color: #C36839;
}
nav .ul-right li a:hover, nav ul li a:focus {
    color: #C36839;
}
.logo-wrapper {
    display: flex;
    width: 100%;
    height: 6rem;
    align-items: flex-end;
    padding: 0 1rem 0.4rem 1rem;
    background: rgb(182, 69, 21);
    background: linear-gradient(0deg, #b54514 0%, #ff5e00 49%, #fce373 100%);
    justify-content: space-between;

        .logo-home {
            position: absolute;
            top: 0;
            left: calc(50% - 5.5rem);
            z-index: 2;
            width: 12rem;
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
.bottom-border {
    position: absolute;
    top: 10.9rem;
    width: 100%;
    // padding: .7rem 0;
    padding: .5rem 0;
    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(149, 57, 16) 74%, rgb(181, 69, 20) 100%);
}

/*Tablet sizes---------------------------------------------------------*/
@media (min-width: 480px) {
    
}
/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 900px) { 
    .heading-text {

        width: 40rem;
        left: calc(50% - 20rem);
    }

    nav {
        position: absolute;
        top: 5.9rem;
        background: none;
        width: 100%;
    }
    // .logo-wrapper { 

        
    //     left: calc(50% - 7rem);
        
    //     width: 14rem;
    // }
    .menu-icon {
        display: none;
    }

   
    nav .ul-left {
        display: flex;
        max-height: 178px;
        padding: 3.8rem 0 0 0;
        justify-content: flex-start;
        width: 100%;
    }
    nav .ul-right {
        display: flex;
        max-height: 178px;
        padding: 3.8rem 0 0 0;
        justify-content: flex-end;
        width: 100%;
    }
    
    nav .ul-left li a {
        color: rgb(255 248 218 / 88%);
        font-size: xx-large;
    }
    nav .ul-right li a {
        color: rgb(255 248 218 / 88%);
        font-size: xx-large;
    }
    .mobil {
        display: none;
    }
    .desktop {
        display: flex;
    }
    .bottom-border {
        padding: 2.8rem 0 0 0;
    }
}

</style>