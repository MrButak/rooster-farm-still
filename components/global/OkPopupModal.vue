<template>

<div v-if="showOkPopupModal" class="ok-popup-modal-wrapper">

    <div class="ok-popup-modal">

        <p>{{ popupMessage }}</p>
        <div class="ok-popup-modal-button-wrapper">
            <button @click="showOkPopupModal = false">Cancel</button>
            <button @click="removeItemFromShoppingCart">Remove</button>
        </div>

    </div>

</div>

</template>


<script setup>

import { showOkPopupModal } from '../../services/stateStore';

defineProps({
    popupMessage: String,
    removeItemFromShoppingCart: Function
});

</script>


<style lang="scss" scoped>

.ok-popup-modal-wrapper {
    z-index: 6;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.66);
}
.ok-popup-modal {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FDFDFD;
    padding: 1.2rem;
    max-width: 45rem;
    border: 1px solid black;
    border-radius: .3rem;
    p {
        font-weight: 600;
    }
}
.ok-popup-modal-button-wrapper {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 2rem;
    width: 100%;
    padding: 1rem 0 0 0;
    button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .2rem;
        background-color: black;
        color: white;
        padding: .5rem .8rem;
        border: 1px solid #b54514;
        letter-spacing: .1rem;
        font-weight: 600;
    }
}
</style>
