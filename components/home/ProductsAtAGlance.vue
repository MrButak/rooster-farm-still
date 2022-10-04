<template>

<div class="products-at-a-glance-wrapper">
    <div class="product-wrapper">
        <h3 class="product-title-text">6 Gal Still</h3>
        <span class="product-image-wrapper">
            <img :src="sixGalStill" class="product-image" />
        </span>
        <p>Price: 700$</p>
        <p>Our 6 gallon copper still is handcrafted from 20 gauge copper.</p>
        <button @click="routeToSeeMore(routeToSeeMore($event))" class="see-more-button">
            See More
        </button>
    </div>
    <div class="product-wrapper">
        <h3 class="product-title-text">12 Gal Still</h3>
        <span class="product-image-wrapper">
            <img :src="twelveGalStill" class="product-image" />
        </span>
        <p>Price: 1,100$</p>
        <p>Our 12 gallon copper still is handcrafted from 20 gauge copper.</p>
        <button @click="routeToSeeMore(routeToSeeMore($event))" class="see-more-button">
            See More
        </button>
    </div>

    <div class="product-wrapper">
        <h3 class="product-title-text">6 Gal Still - Complete</h3>
        <span class="product-image-wrapper">
            <img :src="sixGalStill" class="product-image" />
        </span>
        <p>Price: 1,100$</p>
        <p>Our 6 gallon copper still is handcrafted from 20 gauge copper.</p>
        <button @click="routeToSeeMore(routeToSeeMore($event))" class="see-more-button">
            See More
        </button>
    </div>
    <div class="product-wrapper">
        <h3 class="product-title-text">12 Gal Still - Complete</h3>
        <span class="product-image-wrapper">
            <img :src="twelveGalStill" class="product-image" />
        </span>
        <p>Price: 1,400$</p>
        <p>Our 12 gallon copper still is handcrafted from 20 gauge copper.</p>
        <button @click="routeToSeeMore(routeToSeeMore($event))" class="see-more-button">
            See More
        </button>
    </div>
    
</div>


</template>



<script setup>

import sixGalStill from '../../assests/img/product-images/5-gal.png';
import twelveGalStill from '../../assests/img/product-images/10-gal.png';

</script>



<style lang="scss" scoped>

.products-at-a-glance-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem 1rem 0 1rem;
    width: 100%;
    gap: 2rem;
    
    .product-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0.8 1 46%;
        min-height: 100%;
        height: 20rem;
        border-bottom: 0.1rem solid black;
        padding: 0.8rem 2rem;
        justify-content: flex-end;

        .product-image-wrapper {
            display: flex;
            height: 9rem;
            .product-image {

            }
        }
        .product-title-text {
            font-size: xx-large;
            text-align: center;
        }
        .see-more-button {
            padding: 0.3rem;
            border-radius: 0.4rem;
            background: none;
        }
        
    }
}

</style>
