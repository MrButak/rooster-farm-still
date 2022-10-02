<template>

<header class="menu">
        <div class="menu-wrap">
            
            <img class="heading-text" :src="titleText" />
          
            <input type="checkbox" id="checkbox">
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                </ul>
                
            </nav>
            <label id="hamburg-icon" class="menu-icon" for="checkbox">
                <svg class="hamburgMenuIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
            </label>
        </div>
    </header>

</template>
    
<script setup>

import titleText from  '../../assests/img/title.svg';

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
.menu-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem 0 0;
    height: 5rem;
    background-color: #fce373;
    width: 100%;

}
.heading-text {
    z-index: 3;
    position: absolute;
    top: 7rem;
    left: calc(50% - 7rem);
    width: 14rem;
}
#hamburg-icon {
    padding: 5rem 0 0 0;
    fill: #231f20;
    width: 2rem;
    margin-left: auto;
}
.mobile-header-icon {
    fill: #CEE5D0;
    
}
.mobile-header-icon:hover, .mobile-header-icon:focus {
    fill: #D06224;
}
nav {
    display: flex;
    position: absolute;
    top: 10.9rem;
    left: 0;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(149,57,16,1) 74%, rgba(181,69,20,1) 100%);
    width: 100%;
    justify-content: center;

}

nav ul {
    list-style-type: none;
    max-height: 0px;
    overflow: hidden;
    transition: all .2s;
}
nav ul li {
    padding: 0 15px;
}
nav ul li a {
    display: inline-block;
    padding: 12px;
    // color: #5E454B;
    color: whitesmoke;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.05em;
}
nav ul li a:hover, nav ul li a:focus {
    color: #C36839;
}
#checkbox {
    display: none;
}
#checkbox:checked ~ nav ul {
    max-height: 190px;
    padding: 15px 0;
    transition: all 0.5s;
    // border: 1px solid #5E454B;
}
/*Header end*/
/*Tablet sizes---------------------------------------------------------*/
@media (min-width: 480px) {
    /*Header start*/
    // .menu-wrap {
    //     height: 60px;
    //     width: 100%
    // }
    /* nav {
        top: 60px;
    } */
    // #hamburg-icon {
    //     padding: 6px 0 0 20px;
    // }
    
}
/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 900px) { 
    .heading-text {
        left: calc(50% - 11rem);
        width: 22rem;
    }

    nav {
        position: absolute;
        top: 5.9rem;
        background: none;
        width: 100%;
    }
    .menu-icon {
        display: none;
    }
    .icon-wrapper {
        display: flex;
        gap: 40px;
        padding: 11px 0 0 0;
        margin: 0 0 0 6vw;
    }
   
    nav ul {
        display: flex;
        max-height: 178px;
        padding: 2rem 0 0 0;
        justify-content: space-between;
        width: 100%;
    }
    
    nav ul li a {
        color: #231f20;
    }
    
}

</style>