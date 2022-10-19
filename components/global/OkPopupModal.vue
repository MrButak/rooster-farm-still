<template>

<div v-if="showOkPopupModal" class="ok-popup-modal-wrapper">

    <div class="ok-popup-modal">

        <p>{{ popupMessage }}</p>
        <div class="ok-popup-modal-button-wrapper">
            <button @click="showOkPopupModal = false">Cancel</button>
            <button @click="removeItemFromShoppingCart">Ok</button>
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
    background-color: #35D0BA;
    padding: 1rem;
    width: 80%;
    border: 1px solid #F8C43A;
    border-radius: .3rem;
}
.ok-popup-modal-button-wrapper {
    display: flex;
}
</style>
